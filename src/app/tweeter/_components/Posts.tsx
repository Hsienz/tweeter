"use client"
import {api} from "~/trpc/react";
import Post from "~/app/tweeter/_components/Post";
import {useEffect} from "react";
import {useRouter} from "next/navigation";

export default function Posts() {
    const router = useRouter()
    const getSelfPostQuery = api.post.getSelfPost.useQuery()
    useEffect(()=>{
        console.log("effect")
    },[router])
    return (
        <div className={`flex flex-col gap-y-6 my-6`}>
            {getSelfPostQuery.data?.map( x=>{ return <Post postId={x.id} />})}
        </div>
    )
}