﻿import PostFunctionButtonBase from "~/app/tweeter/_components/PostFunctionalButton/PostFunctionButtonBase";
import Love from "/public/love.svg"
import {api} from "~/trpc/react";

interface Prop {
    postId: number
}
export default function LikeFunctionButton({postId}:Prop) {

    const apiUtils = api.useUtils()

    const createLikeInfoMutation = api.post.like.useMutation({
        onSuccess: ()=>{
            apiUtils.post.getLikeInfo.invalidate({postId:postId})
        }
    })

    const getLikeInfoQuery = api.post.getLikeInfo.useQuery({postId})
    const deleteLikeInfoMutation = api.post.deleteLikeInfo.useMutation({
        onSuccess: () => {
            apiUtils.post.getLikeInfo.invalidate({postId:postId})
        }
    })
    const handleOnEnable = async () => {
        createLikeInfoMutation.mutate({postId});
    }

    const handleOnDisable = () => {
        deleteLikeInfoMutation.mutate({postId})
    }
    const likeInfo = getLikeInfoQuery.data
    return (
        <PostFunctionButtonBase 
            Icon={Love}
            isEnable={!!likeInfo}
            handleOnEnable={handleOnEnable} 
            handleOnDisable={handleOnDisable} 
            textDisable={`Like`} 
            textEnable={`Liked`} 
            textClassNameEnable={`text-font_red`} 
            iconClassNameEnable={`fill-font_red`}/>
    )
}