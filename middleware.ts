import { NextResponse } from "next/server";

import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const path = req.nextUrl.pathname;
  const session = true;

  // If path is safe, return response
  const safePaths = ["/_next", "/favicon.ico"];
  if (safePaths.some((safePath) => path.startsWith(safePath))) {
    return res;
  }

  // If user is in auth pages and is authenticated, redirect to app
  if (path.startsWith("/auth")) {
    if (session) {
      return NextResponse.redirect(new URL("/", req.url));
    } else {
      return res;
    }
  }

  // If user is in app pages and is not authenticated, redirect to auth
  if (!session) {
    return NextResponse.redirect(new URL("/auth/login", req.url));
  }
}

export const config = {
  matcher: ["/:path*"],
};
