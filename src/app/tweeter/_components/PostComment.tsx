"use client"
import {ChangeEvent, useRef, useState} from "react"
import type {User} from "@prisma/client"
import Image from "next/image";
interface Prop {
    user?: User
}
export default function PostComment({user}:Prop) {
    const [commentValue, setCommentValue] = useState("")
    const commentRef = useRef<HTMLTextAreaElement>(null)

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
            <div className={`bg-background_gray mx-4 w-full rounded-md flex py-2`}>
                <textarea onChange={(e) => {
                    onChangeCommentValue(e)
                }} rows={1}
                          ref={commentRef}
                          value={commentValue}
                          className={`text-sm mx-4 resize-none outline-none bg-transparent box-border w-full my-auto placeholder:text-sm`}
                          placeholder={`Tweet your reply`}></textarea>
            </div>
        </div>
    )

}
