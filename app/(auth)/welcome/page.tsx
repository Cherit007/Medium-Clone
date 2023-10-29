import { currentProfile } from "@/lib/current-profile";
import Welcome from "@/pagesfolder/Welcome/Welcome";

const WelcomePage = async () => {
  const user = await currentProfile();
  return <Welcome user={user} />;
};

export default WelcomePage;
