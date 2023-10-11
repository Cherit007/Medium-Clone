import { authMiddleware, RedirectToCreateOrganization } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export default authMiddleware({
  ignoredRoutes: ["/tag", "/api/webhook/user"],
  publicRoutes: ["/"],
  afterAuth(auth, req, evt) {
    // handle users who dont have account
    if (!auth.userId && !auth.isPublicRoute) {
      return NextResponse.redirect("http://localhost:3000/welcome");
    }
  },
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
