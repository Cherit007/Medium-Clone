import { database } from "@/appwriteConfig";
import { currentProfile } from "@/lib/current-profile";
import { ID, Query } from "appwrite";
import { NextResponse } from "next/server";

export async function PATCH(
  req: Request,
  { params }: { params: { articleId: string } }
) {
  try {
    const user = await currentProfile();
    if (!user)
      return new NextResponse("User not found", { status: 401 });

    const userDetails = await req.json();
    const imgUrl =
      userDetails?.articleImgUrl?.$id ?? userDetails?.articleImgUrl;

    await database.updateDocument(
      "651d2c31d4f6223e24e2",
      "651d2c5fca0e679e84a7",
      params.articleId,
      {
        title: userDetails?.title,
        description: userDetails?.description,
        topic: userDetails?.topic,
        articleImgUrl: imgUrl,
      }
    );

    const article = database.listDocuments(
      "651d2c31d4f6223e24e2",
      "651d2c5fca0e679e84a7",
      [Query.equal("authorId", user?.userId)]
    );

    return NextResponse.json({ data: article });
  } catch (e) {
    console.log("AUTH FAILED", e);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
