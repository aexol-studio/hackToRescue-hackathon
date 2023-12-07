import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const protectedRoutes = ["/widget"];

export default function middleware(request: NextRequest) {
  if (protectedRoutes.includes(request.nextUrl.pathname)) {
    if (request.headers.get("sec-fetch-dest") === "iframe")
      return NextResponse.next();
    return NextResponse.redirect(new URL("/", request.url));
  }
}

export const config = {
  matcher: "/widget",
};
