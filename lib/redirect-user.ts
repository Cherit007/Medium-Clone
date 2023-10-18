import { redirect } from "next/navigation";
import { currentProfile } from "./current-profile";

export const redirectUser = async () => {
  const user = await currentProfile();
  if (user?.signUpStatus === "register") redirect("/register");
  else if (user?.signUpStatus === "welcome") redirect("/welcome");
};
