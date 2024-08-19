import {atom} from "jotai";
import {poppins} from "~/app/tweeter/styles/fonts";
import TweetsCategoryButton from "~/app/tweeter/_components/SubNavButtons/TweetsCategoryButton";
import TweetsAndRepliesCategoryButton from "~/app/tweeter/_components/SubNavButtons/TweetsAndRepliesCategoryButton";
import MediaCategoryButton from "~/app/tweeter/_components/SubNavButtons/MediaCategoryButton";
import LikesCategoryButton from "~/app/tweeter/_components/SubNavButtons/LikesCategoryButton";

export const activeIndexAtom = atom(0)
export default function SubNav() {
    return (
        <div className={`bg-white rounded-md flex flex-col h-fit gap-y-4 py-4 w-full sm:w-[40vw] sm:max-w-96 text-font_gray text-sm font-semibold ${poppins.className}`}>
            <TweetsCategoryButton index={0}/>
            <TweetsAndRepliesCategoryButton index={1}/>
            <MediaCategoryButton index={2}/>
            <LikesCategoryButton index={3}/>
        </div>
    )
}