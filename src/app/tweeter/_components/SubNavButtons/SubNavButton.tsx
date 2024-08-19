"use client"
import {activeIndexAtom} from "~/app/tweeter/_components/SubNav";
import {useAtom} from "jotai";
import {postFilterAtom} from "~/app/tweeter/_components/Posts";
import {EPostFilter} from "~/app/tweeter/_components/Posts";

interface Prop {
    text:string,
    onClick:Function
    index: number
    thisPostFilter: EPostFilter
}
export default function SubNavButton({text, onClick, index, thisPostFilter}:Prop) {
    const [activeIndex,setActiveIndex] = useAtom(activeIndexAtom)
    const [postFilter, setPostFilter] = useAtom(postFilterAtom)
    const handleOnClick = () => {
        setActiveIndex(index)
        setPostFilter(thisPostFilter)
        console.log(activeIndex)
    }
    return (
        <button onClick={handleOnClick} className={`transition-all text-nowrap duration-1000 text-left px-4  border-transparent border-solid border-4 ${postFilter === thisPostFilter ? "text-font_blue border-l-font_blue" : ""}`}>
            {text}
        </button>
    )
}