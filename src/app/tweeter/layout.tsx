import {noto_sans} from "~/app/tweeter/styles/fonts";

export default function TweeterLayout({ children }: { children: React.ReactNode }) {
    return (
            <div className={noto_sans.className + "font-"}>
                {children}
            </div>
        )
}