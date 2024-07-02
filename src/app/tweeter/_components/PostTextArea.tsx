"use client"
import {poppins} from "../styles/fonts";
import Image from "/public/image.svg"
import Public from "/public/public.svg"
import Group from "/public/group.svg"
import {useState} from "react";
export default function PostTextArea( ) {
    enum ReplyType {
        everyone,
        follow
    }
    
    const [replyType, setReplyType] = useState(ReplyType.everyone)
    
    return (
        <div className={`w-full h-full rounded-xl bg-white p-4`}>
            <h3 className={`text-sm font-semibold ${poppins.className}`}>Tweet something</h3>
            <div className={`h-[1px] bg-break_gray my-2`}/>

            <div className={`flex`}>

                <div className={`flex flex-col w-full`}>
                    <textarea
                        placeholder={`What's happening?`}
                        className={`resize-none w-full h-full`}
                        rows={2}
                    />
                    <div className={`flex text-icon_blue text-xs `}>
                        <button>
                            <Image className={`fill-icon_blue`}/>
                        </button>
                        {replyType === ReplyType.everyone &&
                            <button className={'flex'}>
                                <Public className={`w-5 h-5 my-auto fill-icon_blue`}/>
                                <p className={`my-auto`}>Everyone can reply</p>
                            </button>
                            
                        }
                        {
                            replyType === ReplyType.follow &&
                            <button className={'flex'}>
                                <Group className={`w-5 h-5 my-auto fill-icon_blue`}/>
                                <p className={`my-auto`}>Only people you follow can reply</p>
                            </button>
                        }
                        
                        
                        <button className={`ml-auto rounded-md bg-icon_blue text-white p-2`}>
                            Tweet
                        </button>
                    </div>
                </div>

            </div>
        </div>
    )
}