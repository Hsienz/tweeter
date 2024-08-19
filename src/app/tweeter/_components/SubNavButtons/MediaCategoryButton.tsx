"use client"
import SubNavButton from "~/app/tweeter/_components/SubNavButtons/SubNavButton";
import {EPostFilter} from "~/app/tweeter/_components/Posts";

interface Prop {
    index: number
}
export default function MediaCategoryButton({index}:Prop) {
    const onClick = () => {
        
    }
    return (
        <SubNavButton text={"Media"} onClick={onClick} index={index} thisPostFilter={EPostFilter.Media}/>
    )
}
