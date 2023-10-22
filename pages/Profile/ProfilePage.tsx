"use client";

import { database } from "@/appwriteConfig";
import Navbar from "@/components/Navbar/Navbar";
import useArticleStore from "@/store/useArticleStore";
import React, { useEffect, useState, Suspense } from "react";
import { fetchArticles } from "@/controllers/fetchUserArticles";
import Select from "react-select";
import { Loader } from "lucide-react";
import { useRouter } from "next/navigation";
import { topics } from "@/constants";
import { Tabs, TabsHeader, TabsBody, Tab, TabPanel } from "@material-tailwind/react";
import ArticleSavedCard from "@/components/Articles/ArticleSavedCard";
import ArticleCard from "@/components/Articles/ArticleCard";

function createTime(time: string) {
    return [(time.split("T")[0]).split("-")[0], (time.split("T")[0]).split("-")[1]];
}

function monthCalculator(month: string) {
    let monthAbbreviation = "";
    switch (month) {
        case "1": monthAbbreviation = "Jan";
            break;
        case "2": monthAbbreviation = "Feb";
            break;
        case "3": monthAbbreviation = "March";
            break;
        case "4": monthAbbreviation = "April";
            break;
        case "5": monthAbbreviation = "May";
            break;
        case "6": monthAbbreviation = "June";
            break;
        case "7": monthAbbreviation = "July";
            break;
        case "8": monthAbbreviation = "Aug";
            break;
        case "9": monthAbbreviation = "Sep";
            break;
        case "10": monthAbbreviation = "Oct";
            break;
        case "11": monthAbbreviation = "Nov";
            break;
        case "12": monthAbbreviation = "Dec";
            break;
    }
    return monthAbbreviation;

}

function userTopicsConversion(userTopics: any) {
    let topics: any = [];
    userTopics.map((topicObject: any, index: number) => {
        topics.push({ value: topicObject.topic, label: topicObject.topic });
    })
    return topics;
}

function userTopicsConversionSelected(userTopicsSelected: any) {
    let topicsSelected: any = [];
    userTopicsSelected.map((topicObject: string, index: number) => {
        topicsSelected.push({ value: topicObject, label: topicObject });
    })
    return topicsSelected;
}

function ProfilePage({ currentUser }: any) {
    const router = useRouter();
    const [loader, setLoader] = useState(true);
    // Created time
    const userCreatedTime = createTime(currentUser.$createdAt);
    // for modal on and off
    const [showModal, setShowModal] = useState(false);
    // retreiving all topics
    const [userTopics, setUserTopics] = useState<UserTopics[]>(topics);
    // converting topics to [{}]
    const options = userTopicsConversion(userTopics);
    // topics selected by user at the time of creation
    const defaultTopics = userTopicsConversionSelected(currentUser.userTopics);
    // topics selected by user now
    const [selectedTopics, setSelectedTopics] = useState(currentUser.userTopics);
    // name enetered by user now
    const [eneteredName, setEnteredName] = useState(currentUser.name);

    const [activeTab, setActiveTab] = React.useState("Stories");
    const data = [
        {
            label: "Stories",
            value: "Stories",
        },
        {
            label: "Saved Stories",
            value: "Saved Stories",
        },
    ];

    const [savedArticle, setSavedArticle] = useArticleStore(
        (state) => [
            state.savedArticle,
            state.setSavedArticle,
            state.setRecommendedTags,
        ]
    );

    const [setUserArticles, userArticles, loading, setLoading] = useArticleStore(
        (state) => [
            state.setUserArticles,
            state.userArticles,
            state.loading,
            state.setLoading,
        ]
    );

    useEffect(() => {
        setTimeout(() => {
            setLoader(false);
        }, 10);
        fetchArticles(setLoading, setUserArticles);
        setSavedArticle(currentUser?.savedArticles);
        setEnteredName(currentUser?.name);
        setSelectedTopics(currentUser?.userTopics);
    }, []);

    function handleClose() {
        setSelectedTopics(currentUser.userTopics);
        setEnteredName(currentUser.name);
        setShowModal(false);
    }


    const handleSave = async () => {
        if (eneteredName === currentUser.name && selectedTopics === currentUser.userTopics) {
            setShowModal(false);
        }
        else {
            selectedTopics
            await database.updateDocument(
                "651d2c31d4f6223e24e2",
                "65219b9e7c62b9078824",
                currentUser?.$id,
                {
                    name: eneteredName,
                    userTopics: selectedTopics
                }
            );
            setShowModal(false);
            window.location.reload();
            // router.push("/me/profile");
        }
    }

    var handleTopicsChange = (selected: any) => {
        if (selectedTopics.includes(selected[selected.length - 1]['value'])) {
            let selectedTopicsNow: any = [];
            selected.map((value: any, index: number) => {
                selectedTopicsNow.push(value.value);
            })
            setSelectedTopics(selectedTopicsNow);
        }
        else {
            setSelectedTopics((selectedTopics: any) => [...selectedTopics, selected[selected.length - 1]['value']]);
        }
    };

    var handleNameChange = (enetered: any) => {
        setEnteredName(enetered.target.value);
    }

    return (
        <>
            {loader ? (
                <p className="flex items-center justify-center h-[60vh]">
                    <Loader className="w-6 h-6 animate-spin" />{" "}
                </p>
            ) :
                <div>
                    <Navbar buttonText="Write" status="navbar" />
                    <div className="w-full grid grid-cols-1 gap-4 mx-auto pt-10 md:w-1/2 md:grid-cols-3">
                        <div className="col-span-2 ml-5 md:m-auto">
                            <span className="text-3xl antialiased font-bold">{currentUser.name}</span>
                            <span className="rounded-full ml-10 border-black-950 border-solid border-2 p-1 align-[5px] cursor-pointer" >
                                <button
                                    type="button"
                                    onClick={() => setShowModal(true)}
                                >
                                    Edit profile
                                </button>
                            </span>
                            <div className="mt-5">Topics Followed:
                                {currentUser.userTopics.map((item: any, key: any) => {
                                    return (
                                        <>
                                            {currentUser.userTopics.length - 1 === key ?
                                                <span> {item}. </span> : <span> {item}, </span>}
                                        </>
                                    );
                                })}</div>
                            <div className="mt-3 font-light">MindScribe member since {monthCalculator(userCreatedTime[1])} {userCreatedTime[0]} <span className="align-[5px] ml-2 mr-2">.</span> Top writer in Design, Startup</div>
                            <div className="mt-3 font-light">50 Following <span className="align-[5px] ml-2 mr-2">.</span> 2.8K Followers</div>
                        </div>

                        <div className="rounded-full h-48 w-48 p-1 border-t border-b border-black border-opacity-50 border-1 m-auto order-first">
                            <img src={currentUser.profile_img_url} alt="Your Image" className="rounded-full w-full h-full" />
                        </div>
                        {showModal ? (
                            <>
                                <div
                                    className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
                                >
                                    <div className="relative w-auto my-6 mx-auto max-w-3xl">
                                        <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                                            <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                                                <h3 className="text-3xl font-semibold ml-auto">
                                                    Edit Details
                                                </h3>
                                                <button
                                                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                                                    onClick={() => setShowModal(false)}
                                                >
                                                    <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                                                        ×
                                                    </span>
                                                </button>
                                            </div>
                                            <div className="relative p-6 flex-auto">
                                                <div className="rounded-full h-48 w-48 p-1 border-t border-b border-black border-opacity-50 border-1 m-auto order-first">
                                                    <img src={currentUser.profile_img_url} alt="Your Image" className="rounded-full w-full h-full" />
                                                </div>
                                                <label>Name: </label>
                                                <input
                                                    type="text"
                                                    className="block w-full px-4 py-2 mt-2 bg-white border rounded-md focus:border-indigo-400 focus:ring-indigo-300 focus:outline-none focus:ring focus:ring-opacity-40 mb-5" value={eneteredName} onChange={handleNameChange}
                                                />
                                                <label>Topics Followed:</label>
                                                <div className="container mx-auto mt-3">
                                                    <Select
                                                        defaultValue={defaultTopics}
                                                        isMulti
                                                        name="topics"
                                                        options={options}
                                                        className="w-full"
                                                        classNamePrefix="select"
                                                        onChange={handleTopicsChange}
                                                    />
                                                </div>
                                            </div>
                                            <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                                                <button
                                                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                                    type="button"
                                                    onClick={handleClose}
                                                >
                                                    Close
                                                </button>
                                                <button
                                                    className="bg-sky-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                                    type="button"
                                                    onClick={handleSave}
                                                >
                                                    Save Changes
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                            </>
                        ) : null}
                    </div>
                    <hr className="w-full m-auto mt-10 border-1 md:w-1/2"></hr>
                    <div className="w-full mx-auto pt-3 md:w-1/2">
                        <Tabs value={activeTab}>
                            <TabsHeader
                                className="rounded-none border-b border-blue-gray-50 bg-transparent p-0 w-full"
                                indicatorProps={{
                                    className:
                                        "bg-transparent border-b-2 border-gray-900 shadow-none rounded-none",
                                }}
                            >
                                {data.map(({ label, value }) => (
                                    <Tab
                                        key={value}
                                        value={value}
                                        onClick={() => setActiveTab(value)}
                                        className={activeTab === value ? "text-gray-900" : ""}
                                    >
                                        {label}
                                    </Tab>
                                ))}
                            </TabsHeader>
                            <TabsBody>
                                <Suspense
                                    fallback={
                                        <p className="bg-white-300 flex justify-center items-center w-full h-[100vh]">
                                            <Loader className="w-6 h-6 animate-spin" />
                                        </p>
                                    }
                                >
                                    {data.map(({ value }) => (
                                        <TabPanel key={value} value={value}>
                                            {value === 'Stories' ? <div>
                                                {loading ? (
                                                    <p className="flex items-center justify-center h-[60vh]">
                                                        <Loader className="w-6 h-6 animate-spin" />{" "}
                                                    </p>
                                                ) : (
                                                    <div className="mt-10">
                                                        {!!userArticles && userArticles.length > 0 ? (
                                                            userArticles.map((item: ArticleProps) => {
                                                                return (
                                                                    <div className="border-b-2 border-gray-100 mb-2">
                                                                        <ArticleCard
                                                                            status="me"
                                                                            title={item.title}
                                                                            description={item.description}
                                                                            topic={item.topic}
                                                                            articleImgUrl={item.articleImgUrl}
                                                                            $createdAt={item.$createdAt}
                                                                            $id={item.$id}
                                                                            users={item?.users}
                                                                        />
                                                                    </div>
                                                                );
                                                            })
                                                        ) : (
                                                            <p className="text-center font-semibold">No stories yet</p>
                                                        )}
                                                    </div>
                                                )}
                                            </div>
                                                :
                                                <div>
                                                    {savedArticle && savedArticle.length > 0 ? (
                                                        savedArticle.map((item) => {
                                                            return <ArticleSavedCard item={item} />;
                                                        })
                                                    ) : (
                                                        <p className="text-center font-semibold">No saved stories</p>
                                                    )}
                                                </div>}
                                        </TabPanel>
                                    ))}
                                </Suspense>
                            </TabsBody>
                        </Tabs>
                    </div>
                </div>}
        </>);
}

export default ProfilePage;