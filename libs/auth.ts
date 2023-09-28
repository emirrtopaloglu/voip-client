import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import User from "@/models/user";

export const isAuth = (
  handler: (req: NextRequest, params?: any, userId?: string) => void
) => {
  return async (req: NextRequest, { params }) => {
    try {
      const cookieStore = cookies();

      const accessToken = cookieStore.get("token")?.value;
      const refreshToken = cookieStore.get("refreshToken")?.value;
      if (!accessToken || !refreshToken) {
        return NextResponse.json(
          {
            success: false,
            error: "Token bulunamadı.",
          },
          { status: 401 }
        );
      }

      const accessClaims = jwt.verify(
        accessToken,
        process.env.ACCESS_TOKEN_SECRET_KEY
      );

      if (!accessClaims) {
        return NextResponse.json(
          {
            success: false,
            error: "Token süresi dolmuş.",
          },
          { status: 401 }
        );
      }
      return handler(req, params, accessClaims.user_id);
    } catch (error) {
      return NextResponse.json(
        {
          success: false,
          error: "JWT expired",
        },
        { status: 401 }
      );
    }
  };
};
