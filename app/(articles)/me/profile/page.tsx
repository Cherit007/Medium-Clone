import { currentProfile } from "@/lib/current-profile";
import ProfilePage from "@/pages/Profile/ProfilePage";
import { Loader } from "lucide-react";
import React, { Suspense } from "react";

async function Profile() {
    const user = await currentProfile();
    return (
        <>
            <Suspense
            fallback={
              <p className="bg-white-300 flex justify-center items-center w-full h-[100vh]">
                <Loader className="w-6 h-6 animate-spin" />
              </p>
            }
          >
            <ProfilePage  currentUser = {user}/>
          </Suspense>
        </>
    );
}

export default Profile;
