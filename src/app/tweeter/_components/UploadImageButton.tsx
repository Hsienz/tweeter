import IconImage from "/public/image.svg"
import {ChangeEvent, ChangeEventHandler, Dispatch, SetStateAction, useRef} from "react";

interface Prop {
    iconClassName: string
    setFiles:Dispatch<SetStateAction<File[]>>
}
export default function UploadImageButton({iconClassName,setFiles}:Prop) {
    const inputRef = useRef<HTMLInputElement>(null)
    const handleOnClick = () => {
        inputRef.current?.click()
    }
    const handleOnChange = (e:ChangeEvent<HTMLInputElement>) => {
        if(!e.target.files) setFiles([])
        else setFiles(Array.from(e.target.files))
    }
    return (
        <button onClick={handleOnClick} className={`aspect-square`}>
            <input onChange={handleOnChange} ref={inputRef} type={`file`} accept={"image/*"} className={`bg-font_blue absolute  w-0 h-0 hidden`}/>
            <IconImage className={`${iconClassName} m-auto`} width={20} height={20} />
        </button>
    )
}