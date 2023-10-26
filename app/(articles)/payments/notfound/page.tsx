import { currentProfile } from "@/lib/current-profile";
import MembershipNotFoundPage from "@/pages/Membership/MembershipNotFound";
import MembershipUnSuccessfullPage from "@/pages/Membership/MembershipUnsuccessfullPage";
import { Loader } from "lucide-react";
import React, { Suspense } from "react";

async function PaymentNotFound() {
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
            <MembershipNotFoundPage currentUser = {user}/>
          </Suspense>
        </>
    );
}

export default PaymentNotFound;
