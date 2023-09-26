import LoginLog from "@/models/loginLog";
import { NextResponse } from "next/server";

export async function DELETE(request: Request, { params }) {
  try {
    if (!params.id) {
      throw new Error("Geçersiz parametre: 'id' eksik veya geçerli değil.");
    }
    const result = await LoginLog.destroy({
      where: {
        id: params.id,
      },
    });

    if (result === 0) {
      return NextResponse.json(
        {
          success: false,
          error: "Log öğesi bulunamadı",
        },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        data: "Log öğesi başarıyla silindi",
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
