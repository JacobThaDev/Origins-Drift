import TrackHeader from "@/components/leaderboards/TrackHeader";
import LocalApi from "@/services/LocalApi";
import { capitalize } from "@/utils/Functions";
import { ScoresTypes } from "@/utils/types/ScoresTypes";
import { Metadata } from "next";

interface MetaProps {
    params: Promise<{ trackName: string }>;
};

export async function generateMetadata({ params }: MetaProps): Promise<Metadata> {
    try {
        const trackName = (await params).trackName.replace("_", " ").replace("%20", " ");
        
        return {
            title: capitalize(trackName)+" Leaderboard",
            description: `Top 50 drifters on ${trackName}`,
        };
    } catch (e:any) {
        return {
            title: "Unknown Tack"
        };
    }
}

export default async function TrackLeaderboard({ params }: { params: Promise<{ trackName: string }>}) {

    const { trackName } = await params;
    const trackData:ScoresTypes = await LocalApi.get("games/fh5/"+trackName+"/leaders").then(r => r.data);

    console.log(trackData);

    return (
        <>
            <TrackHeader trackData={trackData}/>
        </>
    );

}