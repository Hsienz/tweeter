import TopBanner from "~/app/tweeter/_components/TopBanner";
import React from "react";
import MainNav from "~/app/tweeter/_components/MainNav";
import PostTextArea from "~/app/tweeter/_components/PostTextArea";
import {api} from "~/trpc/react";
import TestButton from "~/app/tweeter/_components/TestButton";
import Posts from "~/app/tweeter/_components/Posts";

export default function TweeterPage() {
    return (
        <div className={`h-screen relative flex flex-col bg-background_gray`}>
            <TopBanner/>
            <div className={`w-11/12 max-w-[745px] mx-auto mt-6`}>
                <PostTextArea/>
            </div>
            <div className={`sm:hidden mt-auto h-20`}>
                <MainNav/>
            </div>
            <Posts/>
        </div>
    );
}