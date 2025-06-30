// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value;

  // If the request is for /restaurant/** AND it's not a GET request, protect it
  if (
    request.nextUrl.pathname.startsWith("/restaurant") &&
    !token &&
    request.method !== "GET"
  ) {
    const fullPath = request.nextUrl.pathname + request.nextUrl.search;
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("redirect", fullPath);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/restaurant/:path*"],
};
