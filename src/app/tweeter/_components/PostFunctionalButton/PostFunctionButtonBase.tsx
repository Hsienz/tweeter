import {FC, MouseEventHandler, SVGProps, useState} from "react";

interface Prop {
    Icon: FC<SVGProps<SVGElement>>,
    textDisable: string,
    textEnable: string
    handleOnEnable: Function,
    handleOnDisable: Function,
    iconClassNameEnable: string
    textClassNameEnable: string
    isEnable: boolean
}
export default function PostFunctionButtonBase({Icon,isEnable,textDisable,textEnable,handleOnEnable,handleOnDisable,iconClassNameEnable,textClassNameEnable}:Prop) {
    const handleOnClick = ()=>{
        if(isEnable) handleOnDisable();
        else handleOnEnable();
    }
    return (
        <button onClick={handleOnClick} className={`basis-0 flex-grow py-2 rounded-md hover:bg-background_gray flex gap-x-2 justify-center justify-items-center`}>
            <Icon width={16} height={16} className={`my-auto transition-all duration-500 ${isEnable && iconClassNameEnable ? iconClassNameEnable : "fill-font_dark_gray"}`}/>
            <span className={`text-sm hidden sm:inline transition-all duration-500 ${isEnable && textClassNameEnable ? textClassNameEnable : "text-font_dark_gray"}`}>{isEnable ? textEnable : textDisable}</span>
        </button>
    )
}