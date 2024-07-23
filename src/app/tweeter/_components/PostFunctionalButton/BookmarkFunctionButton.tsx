import PostFunctionButtonBase from "~/app/tweeter/_components/PostFunctionalButton/PostFunctionButtonBase";
import Bookmark from "/public/bookmark.svg"
export default function BookmarkFunctionButton() {
    const onEnable = () => {
        
    }
    const onDisable = () => {
        
    }
    return (
        <PostFunctionButtonBase 
            Icon={Bookmark} 
            onEnable={onEnable} 
            onDisable={onDisable} 
            textDisable={`Save`} 
            textEnable={`Saved`} 
            textClassNameEnable={`text-font_blue`} 
            iconClassNameEnable={`fill-font_blue`}/>
    )
}