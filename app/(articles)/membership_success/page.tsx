import { currentProfile } from "@/lib/current-profile";
import MembershipSuccessPage from "@/pages/Membership/MembershipSuccessPage";
import { Loader } from "lucide-react";
import React, { Suspense } from "react";

async function MembershipSuccess() {
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
            <MembershipSuccessPage currentUser={user}/>
          </Suspense>
        </>
    );
}

export default MembershipSuccess;
