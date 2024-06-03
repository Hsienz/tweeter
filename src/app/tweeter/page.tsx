import TopBanner from "~/app/tweeter/_components/TopBanner";
import React from "react";
import MainNav from "~/app/tweeter/_components/MainNav";

export default function TweeterPage() {
    return (
        <div className={`h-screen relative flex flex-col`}>
            <TopBanner/>
            
            <div className={`sm:hidden mt-auto h-20`}>
                <MainNav/>
            </div>
        </div>
    );
}