import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export default async function middleware(request: NextRequest) {
    const accessToken = request.cookies.get("accessToken")?.value;
    const refreshToken = request.cookies.get("refreshToken")?.value;
    const { pathname } = request.nextUrl;

    const authRoutes = ["/login", "/signup", "/forgot-password"];
    const isDashboardRoute = pathname.startsWith("/dashboard");
    const isAuthRoute = authRoutes.some(route => pathname.startsWith(route));

    if (!accessToken && !refreshToken && isDashboardRoute) {
        return NextResponse.redirect(new URL("/login", request.url));
    }

    if (refreshToken && isAuthRoute) {
        return NextResponse.redirect(new URL("/dashboard", request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/dashboard/:path*", "/login", "/signup", "/forgot-password"],
};