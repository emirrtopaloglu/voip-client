import Menu from "@/models/menu";
import Page from "@/models/page";
import errorGenerator from "@/utils/error";
import getOffsetLimitParams from "@/utils/pagination";
import { createPageSchema } from "@/validations/page";
import { NextApiRequest } from "next";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import sanitizeHtml from "sanitize-html";
import jwt from "jsonwebtoken";
import { isAuth } from "@/libs/auth";

export async function GET(request: NextRequest, res: NextResponse) {
  try {
    const { offset, limit } = getOffsetLimitParams(request);

    const pages = await Page.findAndCountAll({
      offset: offset,
      limit: limit,
    });

    return NextResponse.json(
      {
        success: true,
        data: pages.rows,
        totalCount: pages.count,
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
}

export const POST = isAuth(async function POST(
  request: Request,
  userId: string
) {
  try {
    const body = await request.json();

    const validationResult = createPageSchema.parse(body);

    const result = await Page.create({
      ...validationResult,
      content: sanitizeHtml(validationResult.content),
      is_published: true,
      user_id: +userId,
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
