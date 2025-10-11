import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const pathname = req.nextUrl.pathname;
  const adminPaths = pathname.startsWith("/admin") || pathname.startsWith("/api/admin");

  if (!adminPaths) return NextResponse.next();

  const cookie = req.cookies.get("admin")?.value;
  if (cookie === "1") return NextResponse.next();

  if (pathname.startsWith("/api/")) {
    return new NextResponse(JSON.stringify({ error: "Unauthorized" }), { status: 401, headers: { "Content-Type":"application/json" }});
  }

  const url = req.nextUrl.clone();
  url.pathname = "/admin/login";
  return NextResponse.redirect(url);
}

export const config = { matcher: ["/admin/:path*", "/api/admin/:path*"] };
