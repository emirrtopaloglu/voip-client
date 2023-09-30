import { isAuth } from "@/libs/auth";
import Menu from "@/models/menu";
import errorGenerator from "@/utils/error";
import slugify from "@/utils/slugify";
import { createMenuSchema } from "@/validations/menu";
import { NextApiRequest } from "next";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

export async function GET(request: NextRequest, res: NextResponse) {
  try {
    const menus = await Menu.findAll();

    return NextResponse.json(
      {
        success: true,
        data: menus,
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
    const body = await request.json();

    const validationResult = createMenuSchema.parse(body);

    const result = await Menu.create({
      title: validationResult.title,
      slug: slugify(validationResult.title),
      is_visible: true,
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
