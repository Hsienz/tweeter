"use client"
import {ChangeEvent, useRef, useState} from "react"
import type {User} from "@prisma/client"
import Image from "next/image";
import UploadImageButton from "~/app/tweeter/_components/UploadImageButton";
interface Prop {
    user?: User
}
export default function PostComment({user}:Prop) {
    const [commentValue, setCommentValue] = useState("")
    const commentRef = useRef<HTMLTextAreaElement>(null)
    const [files, setFiles] = useState<File[]>([])
    const onChangeCommentValue = (e: ChangeEvent<HTMLTextAreaElement>) => {
        if( !commentRef || !commentRef.current ) return
        commentRef.current.style.height = "auto"
        commentRef.current.style.height = commentRef.current.scrollHeight + "px"
        setCommentValue(e.target.value)
    }
    return (
        <div className={`flex w-full`}>
            <Image src={user?.image || ""} alt={"self user image"} width={40} height={40}
                   className={`rounded-md mb-auto`}/>
            <div className={`bg-background_gray ml-4 px-4 w-full rounded-md flex py-2`}>
                <textarea onChange={(e) => {
                    onChangeCommentValue(e)
                }} rows={1}
                          ref={commentRef}
                          value={commentValue}
                          className={`text-sm resize-none outline-none bg-transparent box-border w-full my-auto placeholder:text-sm`}
                          placeholder={`Tweet your reply`}></textarea>
                <div className={`flex flex-col`}>
                    <div className={`flex-grow`}/>
                    <UploadImageButton setFiles={setFiles} iconClassName={`fill-font_light_gray`}/>
                    {/*make button on last line of textarea*/}
                    <div className={`h-[2px]`}/>
                </div>
            </div>
        </div>
    )

}
