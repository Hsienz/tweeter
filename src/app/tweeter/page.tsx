import TopBanner from "~/app/tweeter/_components/TopBanner";
import React from "react";
import MainNav from "~/app/tweeter/_components/MainNav";
import PostTextArea from "~/app/tweeter/_components/PostTextArea";
import {api} from "~/trpc/react";
import TestButton from "~/app/tweeter/_components/TestButton";
import Posts from "~/app/tweeter/_components/Posts";
import {getServerAuthSession} from "~/server/auth";
import SubNav from "~/app/tweeter/_components/SubNav";

export default async function TweeterPage() {
    const session = await getServerAuthSession()
    return (
        <div className={`h-fit h-min-screen relative flex flex-col bg-background_gray`}>
                {/*<div className={`h-16 fixed w-full top-full -translate-y-full z-10`}>*/}
                {/*    <MainNav/>*/}
                {/*</div>*/}
            <div>
                <TopBanner/>
            </div>
            <div className={`my-20 flex flex-col sm:flex-row mx-auto w-11/12 max-w-[1024px] gap-x-8 gap-y-4`}>
                <SubNav/>
                <div className={`flex-grow`}>
                    <div className={`mx-auto`}>
                        <PostTextArea image={ session?.user.image || ""}/>
                    </div>
                    <div className={`flex flex-col sm:flex-col-reverse`}>
                        <div className={`w-full mx-auto`}>
                            { /*@ts-ignore*/ }
                            <Posts user={{...session?.user, emailVerified: null}}/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}