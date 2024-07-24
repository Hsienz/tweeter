import PostFunctionButtonBase from "~/app/tweeter/_components/PostFunctionalButton/PostFunctionButtonBase";
import Bookmark from "/public/bookmark.svg"
import {api} from "~/trpc/react";
interface Prop {
    postId: number
}
export default function BookmarkFunctionButton({postId}:Prop) {
    const apiUtils = api.useUtils()

    const createSaveInfoMutation = api.post.save.useMutation({
        onSuccess: ()=>{
            apiUtils.post.getSaveInfo.invalidate({postId:postId})
        }
    })

    const getSaveInfoQuery = api.post.getSaveInfo.useQuery({postId})
    const deleteSaveInfoMutation = api.post.deleteSaveInfo.useMutation({
        onSuccess: () => {
            apiUtils.post.getSaveInfo.invalidate({postId:postId})
        }
    })
    const handleOnEnable = async () => {
        createSaveInfoMutation.mutate({postId});
    }

    const handleOnDisable = () => {
        deleteSaveInfoMutation.mutate({postId})
    }
    const saveInfo = getSaveInfoQuery.data
    return (
        <PostFunctionButtonBase 
            Icon={Bookmark} 
            isEnable={!!saveInfo}
            handleOnEnable={handleOnEnable} 
            handleOnDisable={handleOnDisable} 
            textDisable={`Save`} 
            textEnable={`Saved`} 
            textClassNameEnable={`text-font_blue`} 
            iconClassNameEnable={`fill-font_blue`}/>
    )
}