import { currentProfile } from "@/lib/current-profile";
import { NextResponse } from "next/server";
import axios from "axios";
import { database } from "@/appwriteConfig";
import { Query } from "appwrite";

export async function POST(req: Request) {
  try {
    const user = await currentProfile();
    if (!user) return new NextResponse("User not found", { status: 401 });
    const payload = await req.json();
    const { NEXT_PUBLIC_SENTIMENT_API_URL } = process.env;

    const res = await axios.post(`${NEXT_PUBLIC_SENTIMENT_API_URL}/analyze`, {
      comment: payload?.comment,
    });

    const commentRating = parseInt(res?.data?.comment_rating);

    const avgRating = (payload?.rating + commentRating) / 2;

    await database.updateDocument(
      "651d2c31d4f6223e24e2",
      "651d2c5fca0e679e84a7",
      payload?.articleId,
      {
        articleRating: Math.ceil(avgRating) as number,
      }
    );

    await database.createDocument(
      "651d2c31d4f6223e24e2",
      "653f47c5f252a9caf9f5",
      payload?.uid,
      {
        articleId: payload?.articleId,
        comment: payload?.comment,
        articles: payload?.articles,
        userId: payload?.userId,
      }
    );

    return NextResponse.json({ data: "Success" });
  } catch (e) {
    console.log("AUTH FAILED", e);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
