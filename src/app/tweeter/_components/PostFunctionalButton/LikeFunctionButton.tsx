import PostFunctionButtonBase from "~/app/tweeter/_components/PostFunctionalButton/PostFunctionButtonBase";
import Love from "/public/love.svg"
export default function LikeFunctionButton() {
    const onEnable = () => {
        
    }
    const onDisable = () => {
        
    }
    return (
        <PostFunctionButtonBase 
            Icon={Love} 
            onEnable={onEnable} 
            onDisable={onDisable} 
            textDisable={`Like`} 
            textEnable={`Liked`} 
            textClassNameEnable={`text-font_red`} 
            iconClassNameEnable={`fill-font_red`}/>
    )
}