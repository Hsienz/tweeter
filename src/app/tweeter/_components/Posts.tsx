"use client"
import {api} from "~/trpc/react";
import Post from "~/app/tweeter/_components/Post";
import {useEffect} from "react";
import {useRouter} from "next/navigation";
import type {User} from "@prisma/client"
interface Prop {
    user: User
}
export default function Posts({user}:Prop) {
    const router = useRouter()
    const getSelfPostQuery = api.post.getSelfPost.useQuery()
    return (
        <div className={`flex flex-col gap-y-6 my-6`}>
            {getSelfPostQuery.data?.map( x=>{ return <Post key={x.id} postData={x} user={user} />})}
        </div>
    )
}