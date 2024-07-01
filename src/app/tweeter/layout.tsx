import {Noto_Sans, Poppins} from "next/font/google";

export const noto_sans = Noto_Sans({ subsets: ['latin'] });
export const poppins = Poppins({ weight: '500', subsets: ['latin'] });
export default function TweeterLayout({ children }: { children: React.ReactNode }) {
    return (
            <div className={noto_sans.className}>
                {children}
            </div>
        )
}