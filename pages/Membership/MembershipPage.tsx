"use client";
import React, { useEffect, useState } from "react";
import { database, storage } from "@/appwriteConfig";
import { planFeatures, membershipPrice } from "@/constants";
import Navbar from "@/components/Navbar/Navbar";
import { checkout } from "./checkout";

async function PaymentPage(currentUser: any, keys: any) {
    if (currentUser.is_member === true) {
        window.location.href = "/";
    }
    else {
        const paymentStatus: any = await checkout(keys[0], keys[1]);
        await database.updateDocument(
            "651d2c31d4f6223e24e2",
            "65219b9e7c62b9078824",
            currentUser?.$id,
            {
                payment_session_id: paymentStatus.id
            }
        );
        localStorage.setItem('paymentId', paymentStatus.id);
        window.location.href = paymentStatus.url;
    }
}

function MembershipPage(props: any) {
    const [buttonText, setButtonText] = useState('Upgrade');
    useEffect(() => {
        if(props.currentUser.is_member === true){
            setButtonText('Explore')
        }
        else{
            setButtonText('Upgrade')
        }
    }, [])
    return (
        <>
            <Navbar buttonText="Write" status="navbar" />
            <div className="flex justify-center items-center h-[calc(100vh-12.5vh)]">
                <div className="w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
                    <h5 className="mb-4 text-xl font-medium text-gray-500 dark:text-gray-400">Membership features</h5>
                    <div className="flex items-baseline text-gray-900 dark:text-white">
                        <span className="text-3xl font-semibold">$</span>
                        <span className="text-5xl font-extrabold tracking-tight">{membershipPrice}</span>
                        <span className="ml-1 text-xl font-normal text-gray-500 dark:text-gray-400">/month</span>
                    </div>
                    <ul role="list" className="space-y-5 my-7">
                        {planFeatures.map((item: MembershipPlanFeatures) => {
                            return (<li className="flex space-x-3 items-center">
                                <svg className="flex-shrink-0 w-4 h-4 text-blue-600 dark:text-blue-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                                </svg>
                                <span className="text-base font-normal leading-tight text-gray-500 dark:text-gray-400">{item.label}</span>
                            </li>)
                        })}
                    </ul>
                    {/* <Link href="/payment"> */}
                    <button type="button" className="text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-200 dark:focus:ring-blue-900 font-medium rounded-lg text-sm px-5 py-2.5 inline-flex justify-center w-full text-center" onClick={(() => {
                        PaymentPage(props.currentUser, props.keys)
                    })}>{buttonText}</button>
                    {/* </Link> */}
                </div>
            </div>
        </>
    );
}

export default MembershipPage;
