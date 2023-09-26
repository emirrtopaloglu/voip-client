import MailList from "@/models/mailList";
import Menu from "@/models/menu";
import errorGenerator from "@/utils/error";
import slugify from "@/utils/slugify";
import { updateMenuSchema } from "@/validations/menu";
import { updateNewsLetterSchema } from "@/validations/newsLetter";
import { NextResponse } from "next/server";

export async function DELETE(request: Request, { params }) {
  try {
    if (!params.id) {
      throw new Error("Geçersiz parametre: 'id' eksik veya geçerli değil.");
    }
    const result = await MailList.destroy({
      where: {
        id: params.id,
      },
    });

    if (result === 0) {
      return NextResponse.json(
        {
          success: false,
          error: "Mail aboneliği bulunamadı",
        },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        data: "Mail aboneliği başarıyla silindi",
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

export async function PUT(request: Request, { params }) {
  try {
    if (!params.id) {
      throw new Error("Geçersiz parametre: 'id' eksik veya geçerli değil.");
    }
    const body = await request.json();

    const validationResult = updateNewsLetterSchema.parse(body);

    const result = await MailList.update(
      { ...validationResult },
      {
        where: {
          id: params.id,
        },
      }
    );

    if (result[0] === 0) {
      return NextResponse.json(
        {
          success: false,
          error: "Mail aboneliği bulunamadı",
        },
        { status: 404 }
      );
    }
    return NextResponse.json(
      {
        success: true,
        data: "Mail aboneliği başarıyla güncellendi",
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
