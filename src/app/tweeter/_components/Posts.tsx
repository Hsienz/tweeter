"use client"
import {api} from "~/trpc/react";
import Post from "~/app/tweeter/_components/Post";
import {useEffect} from "react";
import {useRouter} from "next/navigation";
import type {User} from "@prisma/client"
import {atom, useAtom} from "jotai";
interface Prop {
    user?: User
}

export enum EPostFilter {
    Tweets,
    TweetsAndReplies,
    Media,
    Likes,
}

export const postFilterAtom = atom(EPostFilter.Tweets);
export default function Posts({user}:Prop) {
    const [PostFilter] = useAtom(postFilterAtom);
    const getPostQuery = () => {
        if( !user ) return null;
        switch (PostFilter) {
            case EPostFilter.Tweets: 
                return api.post.getUserTweets.useQuery( {userId: user.id});
            case EPostFilter.TweetsAndReplies:
                return api.post.getUserTweetsAndReplies.useQuery({userId: user.id});
            case EPostFilter.Likes:
                return api.post.getUserLikes.useQuery( {userId:user.id});
            case EPostFilter.Media:
                return api.post.getUserMedia.useQuery({userId:user.id});
        }
    }
    const router = useRouter()
    const postQuery = getPostQuery()
    useEffect(() => {
        
    }, []);
    return (
        <div className={`flex flex-col gap-y-6 my-6`}>
            {postQuery?.data?.map( x=>{ return <Post key={x.id} postData={x} user={user} />})}
        </div>
    )
}