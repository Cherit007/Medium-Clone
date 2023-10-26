import { currentProfile } from "@/lib/current-profile";
import MembershipUnSuccessfullPage from "@/pages/Membership/MembershipUnsuccessfullPage";
import { Loader } from "lucide-react";
import React, { Suspense } from "react";

async function PaymentCancel() {
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
            <MembershipUnSuccessfullPage currentUser = {user}/>
          </Suspense>
        </>
    );
}

export default PaymentCancel;
