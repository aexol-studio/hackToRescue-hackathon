import { NextResponse } from "next/server";
import { withAuth } from "next-auth/middleware";

const protectedRoutes = ["/widget"];

export default withAuth(
  function middleware(request) {
    if (protectedRoutes.includes(request.nextUrl.pathname)) {
      if (request.headers.get("sec-fetch-dest") === "iframe") return NextResponse.next();
      return NextResponse.redirect(new URL("/", request.url));
    }
  },
  {
    callbacks: {
      authorized: ({ req, token }) => {
        if (req.nextUrl.pathname.startsWith("/admin") && token === null) {
          return false;
        }
        return true;
      },
    },
  }
);

export const config = {
  matcher: ["/widget", "/admin"],
};
