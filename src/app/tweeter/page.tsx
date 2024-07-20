import TopBanner from "~/app/tweeter/_components/TopBanner";
import React from "react";
import MainNav from "~/app/tweeter/_components/MainNav";
import PostTextArea from "~/app/tweeter/_components/PostTextArea";
import {api} from "~/trpc/react";
import TestButton from "~/app/tweeter/_components/TestButton";
import Posts from "~/app/tweeter/_components/Posts";
import {getServerAuthSession} from "~/server/auth";

export default async function TweeterPage() {
    const session = await getServerAuthSession()
    return (
        <div className={`h-fit h-min-screen relative flex flex-col bg-background_gray`}>
            <div>
                <TopBanner/>
            </div>
            <div className={`mt-8`}>
                <div className={`w-11/12 max-w-[745px] mx-auto`}>
                    <PostTextArea image={ session?.user.image || ""}/>
                </div>
                <div className={`flex flex-col sm:flex-col-reverse h-full`}>
                    <div className={`w-11/12 max-w-[745px] mx-auto`}>
                        <Posts/>
                    </div>
                    
                    <div className={`sm:hidden mt-auto h-20`}>
                        <MainNav/>
                    </div>
                </div>
            </div>
        </div>
    );
}