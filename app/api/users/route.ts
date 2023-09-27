import { isAuth } from "@/libs/auth";
import User from "@/models/user";

import getOffsetLimitParams from "@/utils/pagination";

import { NextRequest, NextResponse } from "next/server";

export const GET = isAuth(async function GET(
  request: NextRequest,
  res: NextResponse
) {
  try {
    const { offset, limit } = getOffsetLimitParams(request);

    const users = await User.findAndCountAll({
      offset: offset,
      limit: limit,
    });

    return NextResponse.json(
      {
        success: true,
        data: users.rows,
        totalCount: users.count,
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
});
