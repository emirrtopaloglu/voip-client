import { NextRequest, NextResponse } from "next/server";
import type { User } from "../../../views/users/types";
export async function GET(req: NextRequest, res: NextResponse) {
  const users: User[] = [
    {
      id: 1,
      firstName: "John",
      lastName: "Doe",
      email: "johndoe@gmail.com",
      companyName: "John Doe Inc.",
      address: "123 Main St.",
      createdAt: new Date(),
      lastLogin: new Date(),
    },
    {
      id: 2,
      firstName: "Furkan",
      lastName: "Doe",
      email: "janedoe@gmail.com",
      companyName: "Jane Doe Inc.",
      address: "123 Main St.",
      createdAt: new Date(),
      lastLogin: new Date(),
    },
  ];

  return NextResponse.json({
    message: "Users found",
    data: users,
  });
}
