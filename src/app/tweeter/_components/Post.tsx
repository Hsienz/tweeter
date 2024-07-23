import {api} from "~/trpc/react";
import Image from "next/image";
import {Prisma} from "@prisma/client";
import {poppins,noto_sans} from "~/app/tweeter/styles/fonts";
import Comment from "/public/comment.svg"
import Love from "/public/love.svg"
import Retweet from "/public/retweet.svg"
import Bookmark from "/public/bookmark.svg"
import type {User} from "@prisma/client";
import PostComment from "~/app/tweeter/_components/PostComment";
import CommentFunctionButton from "~/app/tweeter/_components/PostFunctionalButton/CommentFunctionButton";
import RetweetFunctionButton from "~/app/tweeter/_components/PostFunctionalButton/RetweetFunctionButton";
import LikeFunctionButton from "~/app/tweeter/_components/PostFunctionalButton/LikeFunctionButton";
import BookmarkFunctionButton from "~/app/tweeter/_components/PostFunctionalButton/BookmarkFunctionButton";
type PostDataType = Prisma.PostGetPayload<{
    include: {
        createdBy: true
    }
}>
    
interface Prop {
    user?: User
    postData: PostDataType
}
function Post( {user, postData}:Prop ) {
    return (
        <div className={`w-full rounded-2xl bg-white p-4`}>
            <div className={`flex`}>
                <Image className={`rounded-md mb-auto`} src={postData.createdBy?.image || ""} alt={"user image"}
                       width={40} height={40}/>
                <div className={`flex flex-col ml-2 mb-auto`}>
                    <span className={`${poppins.className}`}>{postData.createdBy?.name}</span>
                    <span
                        className={`${noto_sans.className} text-xs text-font_light_gray`}>{postData.createdAt.toDateString()}</span>
                </div>
            </div>
            <div className={`my-6 text-font_dark_gray`}>
                {postData.content}
            </div>

            <hr className={`h-[1px] bg-break_gray my-2`}/>
            <div className={`flex justify-around my-2`}>
                {/*<Comment />*/}
                {/*<Retweet />*/}
                {/*<Love />*/}
                {/*<Bookmark />*/}
                <CommentFunctionButton/>
                <RetweetFunctionButton/>
                <LikeFunctionButton/>
                <BookmarkFunctionButton/>
            </div>
            <hr className={`h-[1px] bg-break_gray my-2`}/>
            <PostComment user={user}/>
        </div>
    )
}

export default Post