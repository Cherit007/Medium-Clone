import { currentProfile } from "@/lib/current-profile";
import MembershipPage from "@/pages/Membership/MembershipPage";
import { Loader } from "lucide-react";
import React, { Suspense } from "react";

async function Membership() {
    const user = await currentProfile();
    const secret_key = process.env.STRIPE_SECRET_KEY;
    const price_id = process.env.STRIPE_PRICE_ID;
    return (
        <>
            <Suspense
            fallback={
              <p className="bg-white-300 flex justify-center items-center w-full h-[100vh]">
                <Loader className="w-6 h-6 animate-spin" />
              </p>
            }
          >
            <MembershipPage currentUser = {user} keys = {[secret_key, price_id]}/>
          </Suspense>
        </>
    );
}

export default Membership;
