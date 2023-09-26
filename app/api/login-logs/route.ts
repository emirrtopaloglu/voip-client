import LoginLog from "@/models/loginLog";
import errorGenerator from "@/utils/error";
import { createLoginLogSchema } from "@/validations/loginLog";
import getOffsetLimitParams from "@/utils/pagination";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const { offset, limit } = getOffsetLimitParams(request);
    const logs = await LoginLog.findAndCountAll({
      offset: offset,
      limit: limit,
    });

    return NextResponse.json(
      {
        success: true,
        data: logs.rows,
        totalCount: logs.count,
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

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const user_ip =
      request.headers.get("x-forwarded-for") ||
      request.headers.get("x-real-ip");

    const validationResult = createLoginLogSchema.parse(body);
    const result = await LoginLog.create({
      user_id: validationResult.user_id,
      username: validationResult.username,
      user_ip: user_ip || "0.0.0.0",
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
}
