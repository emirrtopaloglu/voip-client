import User from "@/models/user";
import errorGenerator from "@/utils/error";
import { hashPassword } from "@/utils/hash";
import { createUserSchema, loginSchema } from "@/validations/user";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import LoginLog from "@/models/loginLog";

export async function GET(request: Request) {
  try {
    cookies().delete("refreshToken");
    cookies().delete("token");

    return NextResponse.json(
      {
        success: true,
        data: "Çıkış başarılı.",
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
}
