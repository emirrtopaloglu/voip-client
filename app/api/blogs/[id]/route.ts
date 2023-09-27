import { isAuth } from "@/libs/auth";
import Blog from "@/models/blog";
import errorGenerator from "@/utils/error";
import { updatePageSchema } from "@/validations/page";
import { NextResponse } from "next/server";

export async function GET(request: Request, { params }) {
  try {
    if (!params.id) {
      throw new Error("Geçersiz parametre: 'id' eksik veya geçerli değil.");
    }

    const blog = await Blog.findOne({
      where: {
        slug: params.id, // Tricky way
      },
    });

    if (!blog) {
      return NextResponse.json(
        {
          success: false,
          data: "Blog bulunamadı",
        },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        data: blog,
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
    const result = await Blog.destroy({
      where: {
        id: params.id,
      },
    });

    if (result === 0) {
      return NextResponse.json(
        {
          success: false,
          error: "Blog öğesi bulunamadı",
        },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        data: "Blog öğesi başarıyla silindi",
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

    const result = await Blog.update(
      { ...validationResult },
      {
        where: {
          id: params.id,
        },
      }
    );

    // Research another way
    const blog = await Blog.findByPk(params.id);

    if (!blog) {
      return NextResponse.json(
        {
          success: false,
          error: "Blog öğesi bulunamadı",
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
        data: blog,
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
