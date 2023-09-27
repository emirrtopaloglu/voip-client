import Blog from "@/models/blog";
import errorGenerator from "@/utils/error";
import getOffsetLimitParams from "@/utils/pagination";
import { createBlogSchema } from "@/validations/blog";
import { NextRequest, NextResponse } from "next/server";
import sanitizeHtml from "sanitize-html";
import { isAuth } from "@/libs/auth";
import User from "@/models/user";

export async function GET(request: NextRequest, user: User) {
  try {
    const { offset, limit } = getOffsetLimitParams(request);

    const blogs = await Blog.findAndCountAll({
      offset: offset,
      limit: limit,
    });

    return NextResponse.json(
      {
        success: true,
        data: blogs.rows,
        totalCount: blogs.count,
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

    const validationResult = createBlogSchema.parse(body);
    const result = await Blog.create({
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
