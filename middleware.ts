"use server";

import { NextRequest, NextResponse } from "next/server";
import { isAuth } from "./lib/utils";

export function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;

  // If user is in auth pages and is authenticated, redirect to admin page
  if (path.startsWith("/admin/auth")) {
    if (isAuth(req.cookies)) {
      return NextResponse.redirect(new URL("/admin/home", req.url));
    } else {
      return NextResponse.next();
    }
  }

  // If user is in admin pages and is not authenticated, redirect to auth page
  if (!isAuth(req.cookies)) {
    return NextResponse.redirect(new URL("/admin/auth/login", req.url));
  }

  // If user is in admin pages and is authenticated, continue
  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
