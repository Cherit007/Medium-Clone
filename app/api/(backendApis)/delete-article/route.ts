import { database } from "@/appwriteConfig";
import { currentProfile } from "@/lib/current-profile";
import { ID, Query } from "appwrite";
import axios from "axios";
import { NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";

export async function POST(req: Request) {
  try {
    const user = await currentProfile();
    if (!user) return new NextResponse("User not found", { status: 401 });
    const payload = await req.json();
    await database.deleteDocument(
      "651d2c31d4f6223e24e2",
      "651d2c5fca0e679e84a7",
      payload?.id
    );
    await axios.post("http://localhost:8000/delete-article-elastic-search", {
      article_name: payload?.title,
    });

    await axios.post("http://localhost:9000/delete-recommendation", {
      article_name_to_delete: payload?.title,
    });

    return NextResponse.json({ data: "Article deleted successfully" });
  } catch (e) {
    console.log("AUTH FAILED", e);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
