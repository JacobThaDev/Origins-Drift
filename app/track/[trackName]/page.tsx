import Container from "@/components/layout/Container";
import LeaderTable from "@/components/leaderboards/LeaderTable";
import LocalApi from "@/services/LocalApi";
import { capitalize } from "@/utils/Functions";
import { TracksTypes } from "@/utils/types/TracksTypes";
import { Metadata } from "next";
import Image from "next/image";

interface MetaProps {
    params: Promise<{ trackName: string }>;
};

export async function generateMetadata({ params }: MetaProps): Promise<Metadata> {
    try {
        const trackName = (await params).trackName.replace("_", " ").replace("%20", " ");
        
        return {
            title: capitalize(trackName)+" Leaderboard",
            description: `Top 100 drifters on ${trackName}`,
        };
    } catch (e:any) {
        console.error(e);
        return {
            title: "Unknown Tack"
        };
    }
}

export default async function TrackLeaderboard({ params }: { params: Promise<{ trackName: string }>}) {

    const { trackName } = await params;
    const trackData:TracksTypes = await LocalApi.get("games/fh5/"+trackName+"").then(r => r.data);

    if (!trackData || trackData.error) {
        return(
            <>
                <div className={`bg-header w-full min-h-[450px] max-h-[450px] pt-36 flex justify-center items-center text-white`}>
                    <Container>
                        <div className="relative z-[1]">
                            <p className="lg:text-lg mb-3">
                                Leaderboards
                            </p>
                            <p className="text-3xl lg:text-6xl font-black">
                                No Track Data
                            </p>
                        </div>
                    </Container>
                </div>

                <div className="py-24">
                    <Container>
                        <p className="text-danger text-lg font-bold mb-3">An error has occured</p>
                        <p className="mb-5">
                            An error has occured and the track data could not be loaded. 
                            If this problem persists, contact a site admin or try refreshing the page
                            to get the data to load. If you are in the wrong place, well... get to the right place.
                        </p>
                        <div className="bg-black/30 rounded-lg overflow-hidden">
                            <div className="py-3 bg-black/30 px-5">Error:</div>
                            <div className="py-3 px-5">{trackData.error && trackData.error}</div>
                        </div>
                    </Container>
                </div>
            </>
        )
    }

    const bgImage = `/img/tracks/headers/${trackData.short_name}.jpg`;

    return (
        <>
            <div style={{ backgroundImage: `url(${bgImage})`}}
                className={`bg-track w-full min-h-[350px] max-h-[350px] lg:min-h-[450px] lg:max-h-[450px] pt-36 flex justify-center items-center text-white`}/>

            <div className="pb-16">
                <Container>
                    <div className="flex flex-col lg:flex-row gap-7 items-start mt-[-80px] relative">
                        <div className="bg-card rounded-2xl relative mt-[-20px] p-1 lg:min-w-[450px]">
                            <Image src={trackData.track_image} 
                                className="rounded-xl" width={450} height={150} alt=""/>
                        </div>

                        <div className="w-full">
                            <div className="mb-3 lg:mb-12">
                                <p className="text-2xl lg:text-4xl font-bold">
                                    Leaderboard
                                </p>
                                <p>Top 100</p>
                            </div>
                            <LeaderTable track={trackData}/>
                        </div>
                    </div>
                </Container>
            </div>
        </>
    );

}