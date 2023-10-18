import { currentProfile } from "@/lib/current-profile";
import RegisterPage from "@/pages/Register/RegisterPage";

async function page() {
  const user = await currentProfile();

  return <RegisterPage user={user} />;
}

export default page;
