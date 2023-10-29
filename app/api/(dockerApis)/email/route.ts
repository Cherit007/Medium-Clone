import { currentProfile } from "@/lib/current-profile";
import { NextResponse } from "next/server";
import axios from "axios";
import { database } from "@/appwriteConfig";

export async function POST(req: Request) {
  try {
    const user = await currentProfile();
    if (!user) return new NextResponse("User not found", { status: 401 });
    const payload = await req.json();
    await database.updateDocument(
      "651d2c31d4f6223e24e2",
      "65219b9e7c62b9078824",
      user?.$id,
      {
        name: payload?.name,
        signUpStatus: "welcome",
      }
    );
    const res = await axios.post("http://mail-service:9080/send-ack", {
      recipient_email: payload?.recipient_email,
      subject: payload?.subject,
      message: payload?.message,
    });
    return NextResponse.json({ data: res.data });
  } catch (e) {
    // console.log("AUTH FAILED", e);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
