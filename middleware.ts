import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(request: NextRequest) {
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });

  if (!token) {
    return NextResponse.redirect(new URL("/auth", request.url));
  }

  if (request.nextUrl.pathname.startsWith('/service/admin')) {
    if (!token.admin) {
      return NextResponse.json({message: "Unauthorised"}, {status:401})
    }
  }
  if (token) {
    return NextResponse.next();
  }

  return NextResponse.redirect(new URL("/auth", request.url));
}

export const config = {
  matcher: ["/dashboard/:path*", "/service/admin/:path*"],
};
