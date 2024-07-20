"use client"
import Image from "next/image";
import {signOut} from "next-auth/react";

interface Prop {
    name : string,
    image : string,
}
export default function UserInfo({name,image}:Prop) {
    return (
            <button className={`flex`} onClick={()=>signOut()}>
                <Image src={image} alt={"user image"} width={32} height={32} className={`rounded-md`} />
                <span className={`hidden sm:block text-center ml-2 my-auto`}>{name}</span>
            </button>
    )
}