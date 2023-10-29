"use client"
import React, { useEffect } from "react";
import Navbar from "@/components/Navbar/Navbar";
import { Loader } from "lucide-react";

function MembershipNotFoundPage({ currentUser }: any) {

    useEffect(() => {
        setTimeout(() => {
            window.location.href="/plans";
        }, 2000);
    }, []);

    return (
        <>
            <Navbar buttonText="Write" status="navbar" />
            <div className="flex justify-center items-center h-[calc(100vh-23.5vh)]">
                <div className="bg-white p-6  md:mx-auto">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="256"
                        height="256"
                        viewBox="0 0 256 256"
                        className="w-16 h-16 mx-auto my-6"
                    >
                        <g fill="none" strokeMiterlimit="10" strokeWidth="0">
                            <path
                                fill="#EC0000"
                                d="M45 90C20.187 90 0 69.813 0 45S20.187 0 45 0s45 20.187 45 45-20.187 45-45 45z"
                                transform="matrix(2.81 0 0 2.81 1.407 1.407)"
                            ></path>
                            <path
                                fill="#FFF"
                                d="M28.902 66.098a4.998 4.998 0 01-3.536-8.535l32.196-32.196a5 5 0 017.07 7.071L32.438 64.633a4.988 4.988 0 01-3.536 1.465z"
                                transform="matrix(2.81 0 0 2.81 1.407 1.407)"
                            ></path>
                            <path
                                fill="#FFF"
                                d="M61.098 66.098a4.98 4.98 0 01-3.535-1.465L25.367 32.438a5 5 0 117.071-7.071l32.195 32.196a4.998 4.998 0 01-3.535 8.535z"
                                transform="matrix(2.81 0 0 2.81 1.407 1.407)"
                            ></path>
                        </g>
                    </svg>
                    <div className="text-center">
                        <h3 className="md:text-2xl text-base text-gray-900 font-semibold text-center">Membership missing!</h3>
                        <p className="text-gray-600 my-2">Become a member to explore new features.</p>
                        <div className="text-center">
                            <p className="mb-6 mt-10">Redirecting back to the plans page...</p>
                            <p className="flex justify-center items-center">
                                <Loader className="w-6 h-6 animate-spin" />
                            </p>


                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default MembershipNotFoundPage;
