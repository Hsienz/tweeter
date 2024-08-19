"use client"
import SubNavButton from "~/app/tweeter/_components/SubNavButtons/SubNavButton";
import {EPostFilter} from "~/app/tweeter/_components/Posts";

interface Prop {
    index: number
}
export default function TweetsAndRepliesCategoryButton({index}:Prop) {
    const onClick = () => {
        
    }
    return (
        <SubNavButton text={"Tweets & replies"} onClick={onClick} index={index} thisPostFilter={EPostFilter.TweetsAndReplies}/>
    )
}