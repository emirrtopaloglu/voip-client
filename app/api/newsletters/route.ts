import MailList from "@/models/mailList";
import Menu from "@/models/menu";
import errorGenerator from "@/utils/error";
import slugify from "@/utils/slugify";
import { createMenuSchema } from "@/validations/menu";
import getOffsetLimitParams from "@/utils/pagination";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { createNewsLetterSchema } from "@/validations/newsLetter";
import { isAuth } from "@/libs/auth";

export const GET = isAuth(async function GET(request: NextRequest) {
  try {
    const { offset, limit } = getOffsetLimitParams(request);
    const newsletters = await MailList.findAndCountAll({
      offset: offset,
      limit: limit,
    });

    return NextResponse.json(
      {
        success: true,
        data: newsletters.rows,
        totalCount: newsletters.count,
      },
      { status: 200 }
    );
  } catch (err) {
    return NextResponse.json(
      {
        success: false,
        error: err.message,
      },
      { status: 500 }
    );
  }
});

export const POST = isAuth(async function POST(request: Request) {
  try {
    const body = await request.json();

    const validationResult = createNewsLetterSchema.parse(body);

    const result = await MailList.create({
      fullname: validationResult.fullname,
      email: validationResult.email,
      is_subscribed: true,
    });

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
});
