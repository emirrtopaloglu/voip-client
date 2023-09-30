import User from "@/models/user";
import errorGenerator from "@/utils/error";
import { hashPassword } from "@/utils/hash";
import { loginSchema } from "@/validations/user";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import LoginLog from "@/models/loginLog";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const validationResult = loginSchema.parse(body);

    const user = await User.findOne({
      where: {
        email: validationResult.email,
        password: hashPassword(validationResult.password),
      },
    });

    if (!user) {
      return NextResponse.json(
        {
          success: false,
          data: "Kullanıcı adı ya da şifre hatalı.",
        },
        { status: 401 }
      );
    }

    if (!user.getDataValue("is_verified")) {
      return NextResponse.json(
        {
          success: false,
          data: "Kullanıcı aktif değil.",
        },
        { status: 403 }
      );
    }

    const _ = await User.update(
      { last_login: Date.now() },
      {
        where: {
          email: validationResult.email,
          password: hashPassword(validationResult.password),
        },
      }
    );

    const claims = {
      user_id: user.getDataValue("id"),
      full_name:
        user.getDataValue("firstname") + " " + user.getDataValue("lastname"),
      email: user.getDataValue("email"),
      company_name: user.getDataValue("company_name"),
      address: user.getDataValue("address"),
      last_login: user.getDataValue("last_login"),
      exp: Math.floor(Date.now() / 1000) + 15 * 60, // 15 dakika */
    };

    const token = jwt.sign(claims, process.env.ACCESS_TOKEN_SECRET_KEY, {
      algorithm: "HS256",
    });

    const refreshClaims = {
      sub: user.getDataValue("id"),
      exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24,
    };

    const refreshToken = jwt.sign(
      refreshClaims,
      process.env.REFRESH_TOKEN_SECRET_KEY,
      {
        algorithm: "HS256",
      }
    );

    cookies().set("token", token, {
      httpOnly: true,
    });
    cookies().set("refreshToken", refreshToken, {
      httpOnly: true,
    });

    const user_ip =
      request.headers.get("x-forwarded-for") ||
      request.headers.get("x-real-ip");

    const __ = LoginLog.create({
      user_id: user.getDataValue("id"),
      username:
        user.getDataValue("firstname") + " " + user.getDataValue("lastname"),
      user_ip: user_ip || "0.0.0.0",
    });

    return NextResponse.json(
      {
        success: true,
        data: "Giriş başarılı.",
        access_token: token,
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
