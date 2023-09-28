import { readFileSync } from "fs";
import { NextResponse } from "next/server";
import path from "path";

export async function GET(request: Request, { params }) {
  try {
    const filePath = path.resolve(".", `uploads/${params.file}`);
    const body = readFileSync(filePath);

    return new Response(body, {
      headers: {
        "Content-Type": "image/jpeg",
      },
    });
  } catch (err) {
    return NextResponse.json(
      {
        success: false,
        error: "Dosya bulunamadı.",
      },
      { status: 404 }
    );
  }
}
