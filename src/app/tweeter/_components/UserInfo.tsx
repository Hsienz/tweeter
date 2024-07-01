import {getSession, signIn, useSession} from "next-auth/react";
import {getServerAuthSession} from "~/server/auth";
import SignInButton from "~/app/tweeter/_components/SignInButton";

export default async function UserInfo() {
    const session = await getServerAuthSession();
    return (
        <div className={`h-full`}>
            {!session ?
                <SignInButton/>
                :
                <h1>User Info</h1>
            }
        </div>
    )
}