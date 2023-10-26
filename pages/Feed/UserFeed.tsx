"use client"
import ArticleFeed from "@/components/Articles/ArticleFeed";
import SideBarFeed from "@/components/Articles/SideBarFeed";
import Navbar from "@/components/Navbar/Navbar";
import { currentProfile } from "@/lib/current-profile";
import { Loader } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { Suspense, useEffect, useState } from "react";
// function ProfilePage({ currentUser }: any)

async function paymentCheck(secret_key:any, payment_session_id:any) {
    const stripe = require('stripe')(secret_key);
    const session = await stripe.checkout.sessions.retrieve(payment_session_id);
    return session.payment_status;
}
function UserFeed(props: any) {
    const router = useRouter();
    const [noSuccessorCanceledParamsInURL, setnoSuccessorCanceledParamsInURL] = useState(false);

    useEffect(() => {
        const currentUrl = window.location.href
        if (currentUrl === 'http://localhost:3000/?success=true' || currentUrl === 'http://localhost:3000/?cancelled=true') {

            const urlSearchParams = new URLSearchParams(window.location.search);
            const successParam = urlSearchParams.get('success');
            const cancelParam = urlSearchParams.get('cancelled');

            if (successParam === 'true' || cancelParam === 'true') {
                if (props.user['is_member'] === true) {
                    router.push('/payments/success');
                }
                else {
                    router.push('/payments/cancelled');
                }
                setnoSuccessorCanceledParamsInURL(false);
            }
        }
        else {
            setnoSuccessorCanceledParamsInURL(true);
            router.push('/');
        }
    }, [])
    return (
        <>
            {
                noSuccessorCanceledParamsInURL ? (
                    (
                        <>
                            <Suspense
                                fallback={
                                    <p className="bg-white-300 flex justify-center items-center w-full h-[100vh]">
                                        <Loader className="w-6 h-6 animate-spin" />
                                    </p>
                                }
                            >
                                <Navbar buttonText="Write" status="navbar" />
                                <main className="w-full grid grid-cols-3 max-w-6xl mx-auto">
                                    <div className="col-span-3 md:col-span-2 mt-1 p-5">
                                        <ArticleFeed articles={props.feedForUser[0]} currentUser={props.user} />
                                    </div>
                                    <div className="hidden md:flex col-span-1 sticky top-[100px] h-screen overflow-auto no-scrollbar">
                                        <SideBarFeed hotTopicsArr={props.feedForUser[1]} currentUser={props.user} />
                                    </div>
                                </main>
                            </Suspense>
                        </>
                    )
                ) : (<></>)
            }
        </>);
}

export default UserFeed;
