import { isAuth } from "@/lib/utils";
import Page from "@/models/page";
import errorGenerator from "@/utils/error";
import { updatePageSchema } from "@/validations/page";
import { NextResponse } from "next/server";

export async function GET(request: Request, { params }) {
  try {
    if (!params.id) {
      throw new Error("Geçersiz parametre: 'id' eksik veya geçerli değil.");
    }

    const page = await Page.findOne({
      where: {
        slug: params.id, // Tricky way
      },
    });

    if (!page) {
      return NextResponse.json(
        {
          success: false,
          data: "Sayfa bulunamadı",
        },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        data: page,
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

export const DELETE = isAuth(async function DELETE(request: Request, params) {
  try {
    if (!params.id) {
      throw new Error("Geçersiz parametre: 'id' eksik veya geçerli değil.");
    }
    const result = await Page.destroy({
      where: {
        id: params.id,
      },
    });

    if (result === 0) {
      return NextResponse.json(
        {
          success: false,
          error: "Sayfa öğesi bulunamadı",
        },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        data: "Sayfa öğesi başarıyla silindi",
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

export const PUT = isAuth(async function PUT(request: Request, params) {
  try {
    if (!params.id) {
      throw new Error("Geçersiz parametre: 'id' eksik veya geçerli değil.");
    }
    const body = await request.json();

    const validationResult = updatePageSchema.parse(body);

    const result = await Page.update(
      { ...validationResult },
      {
        where: {
          id: params.id,
        },
      }
    );

    // Research another way
    const page = await Page.findByPk(params.id);

    if (!page) {
      return NextResponse.json(
        {
          success: false,
          error: "Sayfa öğesi bulunamadı",
        },
        { status: 404 }
      );
    }

    if (result[0] === 0) {
      throw new Error("Herhangi bir güncelleme yapılamadı.");
    }
    return NextResponse.json(
      {
        success: true,
        data: page,
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
});
