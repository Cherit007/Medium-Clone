import { currentProfile } from "@/lib/current-profile";
import { NextResponse } from "next/server";
import axios from "axios";

export async function POST(req: Request) {
  try {
    const user = await currentProfile();
    if (!user) return new NextResponse("User not found", { status: 401 });

    const userDetails = await req.json();
    const baseUrl =
      process.env.NEXT_PROD_MODE === "true"
        ? "search-engine"
        : process.env.NEXT_PUBLIC_API_BASE_URL;
    const res = await axios.post(`http://${baseUrl}:8000/search`, userDetails);

    return NextResponse.json({ data: res.data });
  } catch (e) {
    console.log("AUTH FAILED", e);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
