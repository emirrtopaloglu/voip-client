import { isAuth } from "@/libs/auth";
import Setting from "@/models/setting";
import errorGenerator from "@/utils/error";
import slugify from "@/utils/slugify";
import { createMenuSchema } from "@/validations/menu";
import { createSettingSchema } from "@/validations/setting";
import { NextApiRequest } from "next";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

/* export async function GET(request: NextRequest, res: NextResponse) {
  try {
    const settings = await Setting.findAll();

    return NextResponse.json(
      {
        success: true,
        data: settings,
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
} */

export const POST = isAuth(async function POST(request: Request) {
  try {
    const body = await request.json();
    body.kv_settings = JSON.stringify(body.kv_settings);
    const validationResult = createSettingSchema.parse(body);

    const result = await Setting.create({
      kv_settings: validationResult.kv_settings,
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
