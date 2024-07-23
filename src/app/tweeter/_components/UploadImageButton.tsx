import IconImage from "/public/image.svg"

interface Prop {
    iconClassName: string
}
export default function UploadImageButton({iconClassName}:Prop) {
    return (
        <button>
            <IconImage className={`${iconClassName}`} width={20} height={20} />
        </button>
    )
}