
import {motion} from "framer-motion";

function Spinner() {
    return (
        <div className={`w-full h-full absolute top-0 left-0 flex items-center justify-center`}>
            <motion.span 
                className={`border-white border-t-icon_blue h-3/5 border-4 border-solid rounded-full aspect-square`}
                animate={{
                    rotate: 360
                }}
                transition={{
                    repeat: Infinity,
                    ease: "easeInOut",
                    duration: 2,
                }}
            />
        </div>    
    )
}

export default Spinner