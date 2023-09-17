import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST(req: NextRequest, res: NextResponse) {
  const cookieStore = cookies();

  cookieStore.set("accessToken", "1234567890", {
    path: "/",
    expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
  });

  return NextResponse.json({
    message: "Login success",
    data: {
      access_token: "1234567890",
      refresh_token: "0987654321",
    },
  });
}
