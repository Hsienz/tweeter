"use client"
import SubNavButton from "~/app/tweeter/_components/SubNavButtons/SubNavButton";
import {EPostFilter} from "~/app/tweeter/_components/Posts";

interface Prop {
    index: number
}
export default function LikesCategoryButton({index}:Prop) {
    const onClick = () => {
        
    }
    return (
        <SubNavButton text={"Likes"} onClick={onClick} index={index} thisPostFilter={EPostFilter.Likes}/>
    )
}
