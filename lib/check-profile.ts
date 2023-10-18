import { database } from "@/appwriteConfig";
import { ID, Query } from "appwrite";

export const checkProfile = async ({ data }: any) => {
  const id = data?.id;
  const email = data?.email_addresses[0]?.email_address;

  const profile = await database.listDocuments(
    "651d2c31d4f6223e24e2",
    "65219b9e7c62b9078824",
    [Query.equal("userId", id)]
  );

  if (profile.documents.length > 0) return profile;

  const newProfile = await database.createDocument(
    "651d2c31d4f6223e24e2",
    "65219b9e7c62b9078824",
    ID.unique(),
    {
      userId: id,
      name: data?.first_name,
      gender: data?.gender,
      profile_img_url: data?.profile_image_url,
      email: email,
      signUpStatus: "register",
    }
  );

  return newProfile;
};
