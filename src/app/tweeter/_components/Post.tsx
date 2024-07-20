import {api} from "~/trpc/react";

interface Prop {
    postId:number
}
function Post( {postId}:Prop ) {
    const getPostQuery = api.post.getPost.useQuery({id:postId})
    return (
        <div className={`w-full rounded-2xl bg-white p-4`}>
            <p>{getPostQuery.data?.content}</p>
        </div>
    )
}

export default Post