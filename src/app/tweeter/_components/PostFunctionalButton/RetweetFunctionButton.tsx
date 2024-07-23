import PostFunctionButtonBase from "~/app/tweeter/_components/PostFunctionalButton/PostFunctionButtonBase";
import Retweet from "/public/retweet.svg"
export default function RetweetFunctionButton() {
    const onEnable = () => {
        
    }
    const onDisable = () => {
        
    }
    return (
        <PostFunctionButtonBase 
            Icon={Retweet} 
            onEnable={onEnable} 
            onDisable={onDisable} 
            textDisable={`Retweet`} 
            textEnable={`Retweeted`} 
            textClassNameEnable={`text-font_green`} 
            iconClassNameEnable={`fill-font_green`}/>
    )
}