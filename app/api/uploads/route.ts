import { isAuth } from "@/libs/auth";
import slugify from "@/utils/slugify";
import { mkdir, writeFile } from "fs/promises";
import { NextRequest, NextResponse } from "next/server";
import path from "path";

export const POST = isAuth(async function POST(
  request: Request,
  userId: string
) {
  try {
    const data = await request.formData();
    const file: File | null = data.get("file") as unknown as File;

    if (!file) {
      return NextResponse.json(
        {
          success: false,
          error: "Yanlış ya da izin verilmeyen bir dosya yüklediniz"
        },
        { status: 400 }
      );
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const uploadFolderPath = `./uploads/`;
    const fileNameWithoutExtension = path.parse(file.name).name;
    const fileExtension = path.extname(file.name);

    const filePath = `${uploadFolderPath}${slugify(
      fileNameWithoutExtension
    )}${fileExtension}`;
    await mkdir(uploadFolderPath, { recursive: true });
    await writeFile(filePath, buffer);
    return NextResponse.json(
      {
        success: true,
        data: "/api" + filePath.substring(1),
      },
      { status: 201 }
    );
  } catch (err) {
    return NextResponse.json(
      {
        success: false,
        error: err
      },
      { status: 500 }
    );
  }
});
