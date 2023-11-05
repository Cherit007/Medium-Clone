import { currentProfile } from "@/lib/current-profile";
import { NextResponse } from "next/server";
import axios from "axios";
import fs from "fs";
import util from "util";
import path from "path";

export async function POST(req: Request) {
  try {
    const user = await currentProfile();
    if (!user) return new NextResponse("User not found", { status: 401 });

    const payload = await req.json();
    if (payload?.status === "add") {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_TEXT_SPEECH_API_URL}/text-to-speech`,
        {
          text: payload?.text,
        },
        {
          responseType: "arraybuffer",
        }
      );
      const file = util.promisify(fs.writeFile);
      const folderPath = path.join("./public", "assets1");
      // if (!fs.existsSync(folderPath)) {
        fs.mkdir(folderPath, { recursive: true }, (err) => {
          if (err) {
            console.error(`Error creating folder: ${err}`);
          } else {
            console.log(`Folder created successfully`);
          }
        });
      // }
      await file(`./public/assets1/${payload?.id}.mp3`, res.data, "binary");
    } else if (payload?.status === "delete") {
      fs.unlink(`./public/assets1/${payload?.id}.mp3`, (err) => {
        if (err) {
          console.error(`Error deleting`);
        } else {
          console.log(`file has been deleted.`);
        }
      });
    }

    return NextResponse.json("success", { status: 200 });
  } catch (e) {
    console.log("AUTH FAILED", e);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
