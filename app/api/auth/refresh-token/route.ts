import User from "@/models/user";
import errorGenerator from "@/utils/error";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function GET(request: Request) {
  try {
    const cookieStore = cookies();
    const refreshToken = cookieStore.get("refreshToken");

    const refreshClaims = jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET_KEY
    );

    if (!refreshClaims) {
      return NextResponse.json(
        {
          success: false,
          error: "Refresh token süresi dolmuş.",
        },
        { status: 401 }
      );
    }

    const userId = refreshClaims.sub;

    const user = await User.findByPk(+userId);

    if (!user) {
      return NextResponse.json(
        {
          success: false,
          error: "Kullanıcı bulunamadı.",
        },
        { status: 401 }
      );
    }

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

    cookies().set("token", token, {
      httpOnly: true,
    });

    return NextResponse.json(
      {
        success: true,
        data: "Token yenileme başarılı.",
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
