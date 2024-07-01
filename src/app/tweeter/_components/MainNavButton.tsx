import Image from "next/image";
import React, {FC, ReactNode, SVGProps} from "react";
import {poppins} from "~/app/tweeter/layout";

interface Prop {
    text: string
    Icon: FC<SVGProps<SVGElement>>,
    index:number,
    activeIndex:number
    setActiveIndex:React.Dispatch<React.SetStateAction<number>>
}
export default function MainNavButton( {text,Icon,index,activeIndex,setActiveIndex}: Prop) {
    return (
        <button onClick={()=>setActiveIndex(index)}
            className={`h-full relative flex justify-center items-center transition-all duration-500 text-sm sm:w-auto w-full sm:min-w-20 ` + 
                ( index === activeIndex && 'border-solid border-b-4 border-blue-400 text-blue-400' ) }
        >
            
            <Icon className={`sm:hidden transition-all duration-500 ` + ( index === activeIndex ? `fill-blue-400` : `fill-[#828282]` ) } />
            <p className={`sm:block hidden ${poppins.className} font-semibold`}>{text}</p>
        </button>
    )
} 