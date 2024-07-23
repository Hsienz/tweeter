"use client"
import {poppins} from "../styles/fonts";
import IconImage from "/public/image.svg"
import Image from "next/image";
import Public from "/public/public.svg"
import Group from "/public/group.svg"
import {useState} from "react";
import {api} from "~/trpc/react";
import {ReplyType} from "@prisma/client";
import UploadImageButton from "~/app/tweeter/_components/UploadImageButton";

interface Prop {
    image : string
}
export default function PostTextArea( {image} : Prop) {
    const apiUtils = api.useUtils()
    
    const [replyType, setReplyType] = useState<ReplyType>(ReplyType.Everyone)
    
    const [postContent,setPostContent] = useState("");
    
    const postCreateMutation = api.post.post.useMutation({
        onSuccess() {
            console.log("Post Success")
            apiUtils.post.invalidate()
        },
        
    })
    
    const OnClickTweetButton = () => {
        postCreateMutation.mutate({content: postContent})
        setPostContent("")
    }
    
    return (
        <div className={`w-full h-full rounded-xl bg-white p-4`}>
            <h3 className={`text-xs font-semibold ${poppins.className}`}>Tweet something</h3>
            <div className={`h-[1px] bg-break_gray my-2`}/>

            <div className={`flex`}>

                <div className={`flex flex-col w-full`}>
                    <div className={`flex`}>
                        <Image src={image} alt={"user image"} width={40} height={40} className={`rounded-md mb-auto`} />
                        <textarea
                            placeholder={`What's happening?`}
                            className={`resize-none w-full h-full outline-none ml-4`}
                            rows={3}
                            value={postContent}
                            onChange={(e)=>setPostContent(e.target.value)}
                        />
                    </div>
                    <div className={`flex text-icon_blue text-xs gap-x-2`}>
                        <UploadImageButton iconClassName={`fill-icon_blue`}/>
                        {replyType === ReplyType.Everyone &&
                                <button className={'flex gap-x-2'} onClick={()=>{setReplyType(ReplyType.Follow)}}>
                                    <Public className={`w-5 h-5 my-auto fill-icon_blue`}/>
                                    <p className={`my-auto`}>Everyone can reply</p>
                                </button>
                        }

                        {replyType === ReplyType.Follow &&
                        <button className={'flex gap-x-2'} onClick={()=>{setReplyType(ReplyType.Everyone)}}>
                            <Group className={`w-5 h-5 my-auto fill-icon_blue`}/>
                            <p className={`my-auto`}>Only people you follow can reply</p>
                        </button>
                        }

                        <button className={`ml-auto rounded-md bg-icon_blue text-white p-2`} onClick={OnClickTweetButton}>
                            Tweet
                        </button>
                    </div>
                </div>

            </div>
        </div>
    )
}