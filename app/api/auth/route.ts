import { currentProfile } from "@/lib/current-profile";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    // const user = await currentProfile();
    return NextResponse.json({ data: { cherit: 1 } });
  } catch (e) {
    // console.log("AUTH FAILED", e);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const user = await currentProfile();
    if (!user) return new NextResponse("User not found", { status: 401 });

    const userDetails = await req.json();

    return NextResponse.json({ data: userDetails });
  } catch (e) {
    console.log("AUTH FAILED", e);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
