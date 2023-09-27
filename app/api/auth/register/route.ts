import User from "@/models/user";
import errorGenerator from "@/utils/error";
import { hashPassword } from "@/utils/hash";
import { createUserSchema } from "@/validations/user";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const validationResult = createUserSchema.parse(body);
    const result = await User.create({
      ...validationResult,
      password: hashPassword(validationResult.password),
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
