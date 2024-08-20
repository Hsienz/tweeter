"use client"
import {api} from "~/trpc/react";
import Post from "~/app/tweeter/_components/Post";
import {useEffect, useMemo, useState} from "react";
import {useRouter} from "next/navigation";
import type {User,Post as PrismaPost} from "@prisma/client"
import {atom, useAtom} from "jotai";
import type {PostDataType} from "~/app/tweeter/_components/Post";

interface Prop {
    userId: string
}

export enum EPostFilter {
    Tweets,
    TweetsAndReplies,
    Media,
    Likes,
}

export const postFilterAtom = atom(EPostFilter.Tweets);
export default function Posts({userId}:Prop) {
    const [postFilter] = useAtom(postFilterAtom);
    const userGetQuery = api.user.get.useQuery({userId: userId})
    const user = userGetQuery.data;
    
    // Directly call query hooks
    const tweetsQuery = api.post.getUserTweets.useQuery({ userId });
    const tweetsAndRepliesQuery = api.post.getUserTweetsAndReplies.useQuery({ userId });
    const mediaQuery = api.post.getUserMedia.useQuery({ userId });
    const likesQuery = api.post.getUserLikes.useQuery({ userId });

    // Memoize the selected post query based on postFilter
    const postQuery = useMemo(() => {
        switch (postFilter) {
            case EPostFilter.Tweets:
                return tweetsQuery;
            case EPostFilter.TweetsAndReplies:
                return tweetsAndRepliesQuery;
            case EPostFilter.Media:
                return mediaQuery;
            case EPostFilter.Likes:
                return likesQuery;
            default:
                return { data: [] }; // Default empty data
        }
    }, [postFilter, tweetsQuery, tweetsAndRepliesQuery, mediaQuery, likesQuery]);
    
    const postData = postQuery.data
    
    return (
        <div className={`flex flex-col gap-y-6 my-6`}>
            {user && postData?.map( x=>{ return <Post key={x.id} postData={x} user={user} />})}
        </div>
    )
}