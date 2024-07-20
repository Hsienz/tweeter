import {getServerAuthSession} from "~/server/auth";
import SignInButton from "~/app/tweeter/_components/SignInButton";
import Image from "next/image";
import {signOut} from "next-auth/react";
import UserInfo from "~/app/tweeter/_components/UserInfo";

export default async function SignInUserInfo() {
    const session = await getServerAuthSession();
    return (
        <div className={`h-full flex items-center`}>
            {!session ?
                <SignInButton/>
                :
                <UserInfo name={session.user.name || "" } image={session.user.image || ""}/>
            }
        </div>
    )
}
