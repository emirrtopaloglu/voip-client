import User from "@/models/user";
import getActivationMail from "@/utils/activationMailContent";
import errorGenerator from "@/utils/error";
import { hashPassword } from "@/utils/hash";
import { createUserSchema } from "@/validations/user";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import sendEmail from "@/libs/sendEmail";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const validationResult = createUserSchema.parse(body);
    const result = await User.create({
      ...validationResult,
      password: hashPassword(validationResult.password),
    });

    let transporter = nodemailer.createTransport({
      host: "mail.duoloper.com",
      port: 465,
      auth: {
        user: "furkan@duoloper.com",
        pass: "Fuki_123!",
      },
    });

    const fullName =
      validationResult.firstname + " " + validationResult.lastname;

    const claims = {
      user_id: result.getDataValue("id"),
      exp: Math.floor(Date.now() / 1000) + 60 * 60,
    };

    const token = jwt.sign(claims, process.env.ACCESS_TOKEN_SECRET_KEY, {
      algorithm: "HS256",
    });

    sendEmail(
      result.getDataValue("email"),
      "Eposta Aktivasyon",
      getActivationMail(
        fullName,
        `${process.env.WEBSITE_URL}/api/activation?token=${token}`
      ),
      (error, info) => {
        if (error) {
          throw new Error("Aktivasyon maili gönderilirken bir hata oluştu");
        }
      }
    );

    return NextResponse.json(
      {
        success: true,
        data: result,
      },
      { status: 201 }
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
}
