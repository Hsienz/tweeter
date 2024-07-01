"use client"

import {signIn} from "next-auth/react";

export default function SignInButton() {
    return (
        <button className={`h-full w-full`} onClick={() => signIn()}>Sign In</button>
    )
} 