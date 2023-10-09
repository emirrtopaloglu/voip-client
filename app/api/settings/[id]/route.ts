import { isAuth } from "@/libs/auth";
import Menu from "@/models/menu";
import Setting from "@/models/setting";
import errorGenerator from "@/utils/error";
import slugify from "@/utils/slugify";
import { updateMenuSchema } from "@/validations/menu";
import { updateSettingSchema } from "@/validations/setting";
import { NextResponse } from "next/server";

/* export const DELETE = isAuth(async function DELETE(request: Request, params) {
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
}); */

export async function GET(request: Request, { params }) {
  try {
    if (!params.id) {
      throw new Error("Geçersiz parametre: 'id' eksik veya geçerli değil.");
    }
    const settings = await Setting.findByPk(params.id);
    settings.setDataValue(
      "kv_settings",
      JSON.parse(settings.getDataValue("kv_settings"))
    );

    return NextResponse.json(
      {
        success: true,
        data: settings,
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

export const PUT = isAuth(async function PUT(request: Request, params) {
  try {
    if (!params.id) {
      throw new Error("Geçersiz parametre: 'id' eksik veya geçerli değil.");
    }
    const body = await request.json();
    body.kv_settings = JSON.stringify(body.kv_settings);
    const validationResult = updateSettingSchema.parse(body);

    const result = await Setting.update(
      { ...validationResult },
      {
        where: {
          id: params.id,
        },
      }
    );

    // Research another way
    const settings = await Setting.findByPk(params.id);

    if (!settings) {
      return NextResponse.json(
        {
          success: false,
          error: "Ayarlar öğesi bulunamadı",
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
        data: settings,
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
