import Image from "next/image";
import MainNav from "~/app/tweeter/_components/MainNav";
import UserInfo from "~/app/tweeter/_components/UserInfo";
import SignInUserInfo from "~/app/tweeter/_components/SignInUserInfo";

export default function TopBanner() {
    return (
        <div className={`h-16 flex px-4 md:px-[72px] justify-between bg-white fixed w-full z-10`}>
            <Image src={`/tweeter.svg`} alt={'logo'} width={150} height={75} className={`hidden sm:block`} />
            <Image src={`/tweeter-small.svg`} alt={'logo'} width={32} height={32} className={`sm:hidden`} /><div className={`sm:block w-full sm:max-w-[328px] fixed sm:translate-y-0  sm:static top-[100vh] -translate-y-full h-[inherit] left-0`}>
                <MainNav/>
            </div>
            <SignInUserInfo/>
        </div>
    )
} 
