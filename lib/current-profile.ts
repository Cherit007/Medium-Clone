import { auth } from "@clerk/nextjs";
import { database } from "@/appwriteConfig";
import { Query } from "appwrite";

export const currentProfile = async () => {
  const { userId } = auth();
  if (!userId) return null;

  const profile = await database.listDocuments(
    "651d2c31d4f6223e24e2",
    "65219b9e7c62b9078824",
    [Query.equal("userId", userId)]
  );
  return profile.documents[0];
};
