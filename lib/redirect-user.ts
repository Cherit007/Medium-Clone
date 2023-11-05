import { currentProfile } from "./current-profile";

export const redirectUser = async () => {
  const user = await currentProfile();
  if (user?.signUpStatus === "register") window.location.href = "/register";
  else if (user?.signUpStatus === "welcome") window.location.href = "/welcome";
};
