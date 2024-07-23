import PostFunctionButtonBase from "~/app/tweeter/_components/PostFunctionalButton/PostFunctionButtonBase";
import Comment from "/public/comment.svg"
export default function CommentFunctionButton() {
    const onEnable = () => {
        
    }
    const onDisable = () => {
        
    }
    return (
        <PostFunctionButtonBase 
            Icon={Comment} 
            onEnable={onEnable} 
            onDisable={onDisable} 
            textDisable={`Comment`} 
            textEnable={`Comment`} 
            textClassNameEnable={``} 
            iconClassNameEnable={``}/>
    )
}