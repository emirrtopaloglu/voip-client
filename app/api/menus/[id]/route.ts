import { isAuth } from "@/libs/auth";
import Menu from "@/models/menu";
import errorGenerator from "@/utils/error";
import slugify from "@/utils/slugify";
import { updateMenuSchema } from "@/validations/menu";
import { NextResponse } from "next/server";

export const DELETE = isAuth(async function DELETE(request: Request, params) {
  try {
    if (!params.id) {
      throw new Error("Geçersiz parametre: 'id' eksik veya geçerli değil.");
    }
    const result = await Menu.destroy({
      where: {
        id: params.id,
      },
    });

    if (result === 0) {
      return NextResponse.json(
        {
          success: false,
          error: "Menü öğesi bulunamadı",
        },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        data: "Menü öğesi başarıyla silindi",
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

    const validationResult = updateMenuSchema.parse(body);

    const result = await Menu.update(
      { ...validationResult, slug: slugify(validationResult.title) },
      {
        where: {
          id: params.id,
        },
      }
    );

    // Research another way
    const menu = await Menu.findByPk(params.id);

    if (!menu) {
      return NextResponse.json(
        {
          success: false,
          error: "Menü öğesi bulunamadı",
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
        data: menu,
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
