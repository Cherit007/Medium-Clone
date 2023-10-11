import { database, storage } from "@/appwriteConfig";
import { currentProfile } from "@/lib/current-profile";
import { Query } from "appwrite";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const user = await currentProfile();
    if (!user) return new NextResponse("User not found", { status: 401 });

    const data = await database.listDocuments(
      "651d2c31d4f6223e24e2",
      "651d2c5fca0e679e84a7",
      [
        Query.equal("authorId", user?.documents[0].userId),
        Query.orderDesc("$createdAt"),
      ]
    );

    const articles = data.documents;

    const fetchImgUrls = (urlId: string, index: number) => {
      if (urlId) {
        const imgs = storage.getFilePreview("6522a1f72adc01958f6c", urlId);
        console.log(urlId,imgs.href,"coooo");
        articles[index].articleImgUrl = imgs.href;
      } else articles[index].articleImgUrl = "";
    };

    articles.map((item, index) => {
      fetchImgUrls(item.articleImgUrl, index);
    });
    console.log("che",articles);
    return NextResponse.json({ data: articles });
  } catch (e) {
    console.log(e);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
