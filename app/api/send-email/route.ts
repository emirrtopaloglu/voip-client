import Blog from "@/models/blog";
import errorGenerator from "@/utils/error";
import getOffsetLimitParams from "@/utils/pagination";
import { createBlogSchema } from "@/validations/blog";
import { NextRequest, NextResponse } from "next/server";
import sanitizeHtml from "sanitize-html";
import { isAuth } from "@/libs/auth";
import User from "@/models/user";
import { createSendEmailSchema } from "@/validations/sendEmail";
import sendEmail from "@/libs/sendEmail";
import MailList from "@/models/mailList";

export const POST = isAuth(async function POST(
  request: Request,
  userId: string
) {
  try {
    const body = await request.json();

    // TO DO : Admin check
    const unsendEmails = [];
    const validationResult = createSendEmailSchema.parse(body);

    // TO DO : Refactor
    if (validationResult.is_all) {
      const newsletters = await MailList.findAll();
      for (const mail of newsletters) {
        sendEmail(
          mail,
          validationResult.mail_title,
          validationResult.mail_body,
          (error, info) => {
            if (error) {
              unsendEmails.push(mail);
            }
          }
        );
      }
      return NextResponse.json(
        {
          success: true,
          data: "E-postalar başarıyla gönderildi.",
          error: unsendEmails,
        },
        { status: 200 }
      );
    }

    for (const mail of validationResult.mail_list) {
      sendEmail(
        mail,
        validationResult.mail_title,
        validationResult.mail_body,
        (error, info) => {
          if (error) {
            unsendEmails.push(mail);
          }
        }
      );
    }

    return NextResponse.json(
      {
        success: true,
        data: "E-postalar başarıyla gönderildi.",
        error: unsendEmails,
      },
      { status: 200 }
    );
  } catch (err) {
    return NextResponse.json(
      {
        success: false,
        error: errorGenerator(err),
      },
      { status: 500 }
    );
  }
});
