import { currentProfile } from "@/lib/current-profile";
import { clerkClient } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const user = await currentProfile();
    if (!user) return new NextResponse("User not found", { status: 401 });
    const payload = await req.json();
    await clerkClient.users.deleteUser(payload?.userId);

    return NextResponse.json({ data: "Successfully deleted" });
  } catch (e) {
    console.log(e);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
