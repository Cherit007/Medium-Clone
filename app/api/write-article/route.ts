import { database } from "@/appwriteConfig";
import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { ID, Query } from "appwrite";
import { NextResponse } from "next/server";

const { APPWRITE_DB_KEY, APPWRITE_ARTICLES_TABLE_KEY } = process.env;

export async function POST(req: Request) {
  try {
    const user = await currentProfile();
    console.log(user, "user");
    if (user?.documents.length === 0)
      return new NextResponse("User not found", { status: 401 });

    const userDetails = await req.json();
    console.log(userDetails,"userDetails");
    const imgUrl = userDetails?.articleImgUrl?.$id ?? "";

    await database.createDocument(
      "651d2c31d4f6223e24e2",
      "651d2c5fca0e679e84a7",
      ID.unique(),
      {
        title: userDetails?.title,
        description: userDetails?.description,
        authorId: user?.documents[0].userId,
        topic: userDetails?.topic,
        articleImgUrl: imgUrl,
      }
    );

    const article = database.listDocuments(
      "651d2c31d4f6223e24e2",
      "651d2c5fca0e679e84a7",
      [Query.equal("authorId", user?.documents[0].userId)]
    );

    return NextResponse.json({ data: article });
  } catch (e) {
    console.log("AUTH FAILED", e);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
