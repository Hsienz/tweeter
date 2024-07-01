import {getServerAuthSession} from "~/server/auth";

export default async function Posts() {
    const session = await getServerAuthSession()
    return (
        <div>
            <h1>Posts</h1>
            {session?<p>Logged in</p> : <p>Not logged in</p>}
        </div>
    )
}