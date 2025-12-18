import HomeHeader from "@/components/home/Header";
import TracksSection from "@/components/home/Tracks";
import LocalApi from "@/services/LocalApi";
import { GamesTypes } from "@/utils/types/GamesTypes";
import { TracksTypes } from "@/utils/types/TracksTypes";

export default async function Home() {

    let trackData:TracksTypes[] = [];

    try {
        const gamesData:GamesTypes = await LocalApi.get("games/fh5").then(r => r.data);

        if (gamesData != null) {
            trackData = gamesData.tracks;
        }
    } catch (e:any) {
        console.error(e);
        return(
            <>
                <HomeHeader/>
            </>
        )
    }
    
    return (
        <>
            <HomeHeader/>
            <TracksSection tracks={trackData}/>
        </>
    );

}