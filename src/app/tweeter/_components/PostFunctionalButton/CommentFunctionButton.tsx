import PostFunctionButtonBase from "~/app/tweeter/_components/PostFunctionalButton/PostFunctionButtonBase";
import Comment from "/public/comment.svg"
import {useState} from "react";

interface Prop {
    postId: number
}
export default function CommentFunctionButton({postId}:Prop) {
    const [isEnable, setIsEnable] = useState(false)
    const handleOnEnable = () => {
        setIsEnable(false);
    }
    const handleOnDisable = () => {
        setIsEnable(true);
    }
    return (
        <PostFunctionButtonBase 
            Icon={Comment} 
            isEnable={isEnable}
            handleOnEnable={handleOnEnable} 
            handleOnDisable={handleOnDisable} 
            textDisable={`Comment`} 
            textEnable={`Comment`} 
            textClassNameEnable={``} 
            iconClassNameEnable={``}/>
    )
}