import User from "@/models/user";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const token = searchParams.get("token");

    const tokenClaims = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET_KEY);

    if (!tokenClaims) {
      return NextResponse.json(
        {
          success: false,
          data: "Aktivasyon epostasının süresi dolmuş.", // TO DO : Resend eklenebilir
        },
        { status: 403 }
      );
    }

    const user = await User.findByPk(tokenClaims.user_id);

    if (user.getDataValue("is_verified")) {
      return NextResponse.json(
        {
          success: true,
          data: "Bu üyelik daha önce aktifleştirilmiş.",
          totalCount: null,
        },
        { status: 200 }
      );
    }

    const _ = await User.update(
      { is_verified: true },
      {
        where: {
          id: tokenClaims.user_id,
        },
      }
    );

    return NextResponse.json(
      {
        success: true,
        data: "Üyeliğiniz başarıyla aktifleştirilmiştir.",
        totalCount: null,
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
