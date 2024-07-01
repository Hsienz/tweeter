import Image from "next/image";
import MainNav from "~/app/tweeter/_components/MainNav";
import UserInfo from "~/app/tweeter/_components/UserInfo";

export default function TopBanner() {
    return (
        <div className={`h-16 flex px-[72px] justify-between bg-white`}>
            <Image src={`/tweeter.svg`} alt={'logo'} width={150} height={75} className={`hidden sm:block`} />
            <Image src={`/tweeter-small.svg`} alt={'logo'} width={32} height={32} className={`sm:hidden`} />
            <div className={`hidden sm:block w-full sm:max-w-[328px]`}>
                <MainNav/>
            </div>
            <UserInfo/>
        </div>
    )
} 
