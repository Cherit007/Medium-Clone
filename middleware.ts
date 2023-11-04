import { authMiddleware } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export default authMiddleware({
  ignoredRoutes: ["/api/webhook/user"],
  publicRoutes: ["/"],

  afterAuth(auth, req, evt) {
    // handle users who dont have account
    if (!auth.userId && !auth.isPublicRoute) {
      const url =
        process.env.NEXT_PROD_MODE === "true"
          ? process.env.NEXT_PUBLIC_FRONT_END_URL
          : "http://localhost:3000";
      return NextResponse.redirect(url as string);
    }
  },
});

export const config = {
  matcher: [
    "/((?!.+\\.[\\w]+$|_next).*)",
    "/",
    "/(api|trpc)(.*)",
    "/article/:path*",
  ],
};
