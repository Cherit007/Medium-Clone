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

    const res = await axios.post("http://localhost:9000/get-recommendations", {
      article_name: "Securing Your Web Applications: Best Practices",
    });
    const articles = res.data.recommendations;

    const queryPromises = articles.map(async (item: string) => {
      const resp = await database.listDocuments(
        "651d2c31d4f6223e24e2",
        "651d2c5fca0e679e84a7",
        [Query.equal("title", item)]
      );
      return resp.documents;
    });
    let recommendedArticles: any[] = [];

    const results = await Promise.all(queryPromises);

    results.forEach((result) => {
      recommendedArticles = recommendedArticles.concat(result[0]);
    });

    const authorIds = Array.from(
      recommendedArticles.map((item) => item?.authorId).filter(Boolean)
    );
    const userPromises = authorIds.map(async (authorId: string) => {
      const response = await database.listDocuments(
        "651d2c31d4f6223e24e2",
        "65219b9e7c62b9078824",
        [Query.equal("userId", authorId)]
      );
      return response.documents[0];
    });

    const users = await Promise.all(userPromises);
    const updatedResults = recommendedArticles.map((item) => {
      const user = users.find((u) => u?.userId === item?.authorId);
      return { ...item, users: user };
    });

    return NextResponse.json({ data: updatedResults });
  } catch (e) {
    // console.log("AUTH FAILED", e);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
