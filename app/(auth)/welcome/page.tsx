import { currentProfile } from "@/lib/current-profile";
import Welcome from "@/pages/Welcome/Welcome";

const WelcomePage = async () => {
  const user = await currentProfile();
  return <Welcome user={user} />;
};

export default WelcomePage;
