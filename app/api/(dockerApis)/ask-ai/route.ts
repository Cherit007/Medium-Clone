import { currentProfile } from "@/lib/current-profile";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import axios from "axios";

export async function POST(req: Request) {
  try {
    const user = await currentProfile();
    if (!user) return new NextResponse("User not found", { status: 401 });

    const userDetails = await req.json();
    const { NEXT_PUBLIC_API_BASE_URL, NEXT_PROD_MODE } = process.env;

    const baseUrl = NEXT_PROD_MODE==="true" ? "ask-ai" : NEXT_PUBLIC_API_BASE_URL;

    const res = await axios.post(`http://${baseUrl}:7001/ask-ai`, userDetails);

    return NextResponse.json({ data: res.data });
  } catch (e) {
    console.log("AUTH FAILED", e);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
