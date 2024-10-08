﻿"use client"
import {poppins} from "../styles/fonts";
import Image from "next/image";
import Public from "/public/public.svg"
import Group from "/public/group.svg"
import {Suspense, useState} from "react";
import {api} from "~/trpc/react";
import {ReplyType} from "@prisma/client";
import UploadImageButton from "~/app/tweeter/_components/UploadImageButton";
import Loading from "~/app/tweeter/loading";
import Spinner from "~/app/tweeter/_loading/Spinner";

interface Prop {
    image : string
}
export default function PostTextArea( {image} : Prop) {
    const apiUtils = api.useUtils()
    
    const [replyType, setReplyType] = useState<ReplyType>(ReplyType.Everyone)
    
    const [postContent,setPostContent] = useState("");
    
    const [files,setFiles] = useState<File[]>([])
    
    const [isUploading,setIsUploading] = useState<boolean>(false)
    
    const postCreateMutation = api.post.post.useMutation({
        onSuccess() {
            console.log("Post Success")
            apiUtils.post.getSelfPost.invalidate()
            setPostContent("")
            setFiles([])
        },
        onSettled() {
            setIsUploading(false)
        }
        
    })

    const OnClickTweetButton = async () => {
        setIsUploading(true)
        const formData = new FormData()
        files.forEach(x=>formData.append("files", x))
        const res = await fetch('/api/s3/upload', {
            method: 'POST',
            body: formData,
        })
        const json = await res.json()
        console.log(json)
        
        postCreateMutation.mutate({content: postContent, files: json.filenames})
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
                        <UploadImageButton setFiles={setFiles} iconClassName={`fill-icon_blue`}/>
                        {replyType === ReplyType.Everyone &&
                                <button className={'flex gap-x-2 px-2'} onClick={()=>{setReplyType(ReplyType.Follow)}}>
                                    <Public className={`w-5 h-5 my-auto fill-icon_blue`}/>
                                    <p className={`my-auto`}>Everyone can reply</p>
                                </button>
                        }

                        {replyType === ReplyType.Follow &&
                        <button className={'flex gap-x-2 px-2'} onClick={()=>{setReplyType(ReplyType.Everyone)}}>
                            <Group className={`w-5 h-5 my-auto fill-icon_blue`}/>
                            <p className={`my-auto`}>Only people you follow can reply</p>
                        </button>
                        }

                        <button className={`relative ml-auto rounded-md bg-icon_blue text-white p-2`} onClick={OnClickTweetButton} disabled={isUploading}>
                            <span className={`${isUploading ? "invisible" : ""}`}>Tweet</span>
                            {isUploading && <Spinner/>}
                        </button>
                    </div>
                </div>

            </div>
        </div>
    )
}