import {ReactNode} from "react";

interface Prop{
    LoadingNode: ReactNode
}
function Loading({LoadingNode}:Prop) {
    return (
        LoadingNode ?
            LoadingNode
            :
            <></>
            
    )
}

export default Loading