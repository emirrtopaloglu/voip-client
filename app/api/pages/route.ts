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
import { isAuth } from "@/lib/utils";

async function GET(request: NextRequest, res: NextResponse) {
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

export const POST = isAuth(async function POST(request: Request) {
  try {
    const refreshToken = cookies().get("refreshToken").value;
    console.log("refresh token : ", refreshToken);
    const tokenResult = await jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET_KEY
    );
    console.log("token result : ", tokenResult);
    const body = await request.json();

    const validationResult = createPageSchema.parse(body);
    // TODO : Get user id from cookie or something else
    const result = await Page.create({
      ...validationResult,
      content: sanitizeHtml(validationResult.content),
      is_published: true,
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
