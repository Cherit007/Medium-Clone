"use client"
import React, { useEffect, useState } from "react";
import Navbar from "@/components/Navbar/Navbar";
import { Loader } from "lucide-react";

function MembershipSuccessPage({ currentUser }: any) {

    const [isMember, setIsMember] = useState(false);

    useEffect(() => {
        if (currentUser.is_member === true) {
            setIsMember(true);
            setTimeout(() => {
                window.location.href = "/";
            }, 3000);
        }
        else {
            window.location.href = "/payments/notfound"
        }
    }, []);

    return (
        <>
            {isMember ? (
                <>
                    <Navbar buttonText="Write" status="navbar" />
                    <div className="flex justify-center items-center h-[calc(100vh-23.5vh)]">
                        <div className="bg-white p-6  md:mx-auto">
                            <svg viewBox="0 0 24 24" className="text-green-600 w-16 h-16 mx-auto my-6">
                                <path fill="currentColor"
                                    d="M12,0A12,12,0,1,0,24,12,12.014,12.014,0,0,0,12,0Zm6.927,8.2-6.845,9.289a1.011,1.011,0,0,1-1.43.188L5.764,13.769a1,1,0,1,1,1.25-1.562l4.076,3.261,6.227-8.451A1,1,0,1,1,18.927,8.2Z">
                                </path>
                            </svg>
                            <div className="text-center">
                                <h3 className="md:text-2xl text-base text-gray-900 font-semibold text-center">Payment Done!</h3>
                                <p className="text-gray-600 my-2">Thank you for completing your secure online payment.</p>
                                <p> Have a great day!  </p>
                                <div className="py-5 text-center">
                                    {/* <a href="#" className="px-12 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-3">
                                GO BACK
                            </a> */}
                                    <p className="mb-6">Heading home to explore our fresh AI features – fasten your seatbelt!</p>
                                    <p className="flex justify-center items-center">
                                        <Loader className="w-6 h-6 animate-spin" />
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            ) : <></>}
        </>
    );
}

export default MembershipSuccessPage;
