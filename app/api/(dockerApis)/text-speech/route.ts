import { currentProfile } from "@/lib/current-profile";
import { NextResponse } from "next/server";
import axios from "axios";
import fs from "fs";
import util from "util";
export async function POST(req: Request) {
  try {
    const user = await currentProfile();
    if (!user) return new NextResponse("User not found", { status: 401 });

    const payload = await req.json();

    const res = await axios.post(
      "http://localhost:9090/text-to-speech",
      {
        text: payload?.text,
      },
      {
        responseType: "arraybuffer",
      }
    );
    const file = util.promisify(fs.writeFile);
    await file(`./public/assets/${payload?.id}.mp3`, res.data, "binary");
    
    return NextResponse.json("success", { status: 200 });
  } catch (e) {
    console.log("AUTH FAILED", e);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
