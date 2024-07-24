"use client"
import Image from "next/image";
import React, {ReactNode, useState} from "react";
import MainNavButton from "~/app/tweeter/_components/MainNavButton";
import Home from "/public/home.svg"
import Explore from "/public/explore.svg"
import Bookmark from "/public/bookmark.svg"
export default function MainNav() {
    const [activeButton, setActiveButton] = useState(0);
    return (
        <div className={`flex justify-around h-full w-full bg-white`}>
            <MainNavButton Icon={Home} text={`Home`} index={0} activeIndex={activeButton} setActiveIndex={setActiveButton}/>
            <MainNavButton Icon={Explore} text={`Explore`} index={1} activeIndex={activeButton} setActiveIndex={setActiveButton}/>
            <MainNavButton Icon={Bookmark} text={`Bookmarks`} index={2} activeIndex={activeButton} setActiveIndex={setActiveButton}/>
        </div>
    )
} 