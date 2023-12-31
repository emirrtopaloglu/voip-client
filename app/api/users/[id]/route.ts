import { isAuth } from "@/libs/auth";
import Page from "@/models/page";
import User from "@/models/user";
import errorGenerator from "@/utils/error";
import { updatePageSchema } from "@/validations/page";
import { updateUserSchema } from "@/validations/user";
import { NextResponse } from "next/server";

export const GET = isAuth(async function GET(request: Request, params) {
  try {
    if (!params.id) {
      throw new Error("Geçersiz parametre: 'id' eksik veya geçerli değil.");
    }

    const user = await User.findOne({
      where: {
        id: params.id
      }
    });

    if (!user) {
      return NextResponse.json(
        {
          success: false,
          error: "Kullanıcı bulunamadı",
        },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        data: user
      },
      { status: 200 }
    );
  } catch (err) {
    return NextResponse.json(
      {
        success: false,
        error: err.message
      },
      { status: 500 }
    );
  }
});

export const DELETE = isAuth(async function DELETE(request: Request, params) {
  try {
    if (!params.id) {
      throw new Error("Geçersiz parametre: 'id' eksik veya geçerli değil.");
    }
    const result = await User.destroy({
      where: {
        id: params.id
      }
    });

    if (result === 0) {
      return NextResponse.json(
        {
          success: false,
          error: "Kullanıcı bulunamadı"
        },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        data: "Kullanıcı başarıyla silindi"
      },
      { status: 200 }
    );
  } catch (err) {
    return NextResponse.json(
      {
        success: false,
        error: err.message
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

    const validationResult = updateUserSchema.parse(body);

    const result = await User.update(
      { ...validationResult },
      {
        where: {
          id: params.id
        }
      }
    );

    // Research another way
    const user = await User.findByPk(params.id);
    if (!user) {
      return NextResponse.json(
        {
          success: false,
          error: "Kullanıcı bulunamadı"
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
        data: user
      },
      { status: 200 }
    );
  } catch (err) {
    return NextResponse.json(
      {
        success: false,
        error: errorGenerator(err)
      },
      { status: 500 }
    );
  }
});
