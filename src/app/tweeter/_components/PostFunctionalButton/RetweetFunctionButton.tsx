import PostFunctionButtonBase from "~/app/tweeter/_components/PostFunctionalButton/PostFunctionButtonBase";
import Retweet from "/public/retweet.svg"
import {api} from "~/trpc/react";
interface Prop {
    postId: number
}
export default function RetweetFunctionButton({postId}:Prop) {
    const apiUtils = api.useUtils()

    const UpdateDBValueOnPage = () => {
        apiUtils.post.getRetweetInfo.invalidate({postId:postId})
        apiUtils.post.getRetweetCount.invalidate({postId:postId})

    }
    const getRetweetInfoQuery = api.post.getRetweetInfo.useQuery({postId})

    const createRetweetInfoMutation = api.post.retweet.useMutation({
        onSuccess: ()=>{
            UpdateDBValueOnPage()
        }
    })
    const deleteRetweetInfoMutation = api.post.deleteRetweetInfo.useMutation({
        onSuccess: () => {
            UpdateDBValueOnPage()
        }
    })
    const handleOnEnable = async () => {
        createRetweetInfoMutation.mutate({postId});
    }

    const handleOnDisable = () => {
        deleteRetweetInfoMutation.mutate({postId})
    }
    const retweetInfo = getRetweetInfoQuery.data
    return (
        <PostFunctionButtonBase 
            Icon={Retweet} 
            isEnable={!!retweetInfo}
            handleOnEnable={handleOnEnable} 
            handleOnDisable={handleOnDisable} 
            textDisable={`Retweet`} 
            textEnable={`Retweeted`} 
            textClassNameEnable={`text-font_green`} 
            iconClassNameEnable={`fill-font_green`}/>
    )
}