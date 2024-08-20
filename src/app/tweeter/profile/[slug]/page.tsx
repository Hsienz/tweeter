import Posts from "~/app/tweeter/_components/Posts";
import {api} from "~/trpc/react";

interface Prop {
    params: {
        slug: string
    }
}

export default function Profile({params}:Prop) {
    return (
        <div>
            <Posts userId={params.slug} />
        </div>
    )
}