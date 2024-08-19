"use client"
import SubNavButton from "~/app/tweeter/_components/SubNavButtons/SubNavButton";
import {EPostFilter} from "~/app/tweeter/_components/Posts";

interface Prop {
    index: number 
}
export default function TweetsCategoryButton({index}:Prop) {
    const onClick = () => {
        
    }
    return (
        <SubNavButton index={index} text={"Tweet"} onClick={onClick} thisPostFilter={EPostFilter.Tweets}/>
    )
}