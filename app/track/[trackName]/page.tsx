"use client";

import ErrorBox from "@/components/global/ErrorBox";
import LoadingBox from "@/components/global/LoadingBox";
import { RouteIcon } from "@/components/icons/RouteIcon";
import { UserIcon } from "@/components/icons/UserIcon";
import Container from "@/components/layout/Container";
import PageHeader from "@/components/layout/PageHeader";
import ClassButton from "@/components/leaderboards/ClassButton";
import LeaderTable from "@/components/leaderboards/LeaderTable";
import TrackSelector from "@/components/leaderboards/TrackSelector";
import { TracksContextTypes, useTracksContext } from "@/providers/TracksProvider";
import { TracksTypes } from "@/utils/types/TracksTypes";
import { DocumentDuplicateIcon } from "@heroicons/react/24/outline";
import { use, useEffect } from "react";

export default function TrackLeaderboard({ params }: { params: Promise<{ trackName: string }>}) {

    const { trackName } = use(params);
    const { error, tracks, current, setCurrent, loading, perfIndex }:TracksContextTypes = useTracksContext();

    useEffect(() => {
        if (!tracks) {
            return;
        }
        tracks.forEach((track:TracksTypes) => {
            if (track.short_name.toLowerCase() == trackName.toLowerCase()) {
                setCurrent(track);
            }
        });
    }, [ tracks, trackName ]);

    if (error) 
        return (<ErrorBox message={error}/>);

    if (loading) {
        return <LoadingBox message="Fetching track data"/>
    }

    if (!current) {
        return null;
    }

    return(
        <>
            <PageHeader>
                <>
                <div className="relative max-w-full text-start">

                    <div className="flex gap-2 font-bold mb-3 w-full text-nowrap flex-wrap text-xs lg:text-sm">
                        <div className="bg-warning/20 border-2 border-warning/20 text-warning py-1 px-2 rounded-lg">
                            Medium
                        </div>

                        {current.favorite && 
                        <div className="bg-info/10 border-2 border-info/10 py-1 px-2 rounded-lg">
                            Top Track
                        </div>}

                        {current.Game?.symbol == "FH5" && 
                        <div className="flex gap-2 lg:ml-auto bg-black/20 border-2 border-border py-1 px-2 rounded-lg items-center">
                            <p className="text-info font-black">FORZA</p>
                            <p className="text-white/60">HORIZON 5</p>
                        </div>}

                        {current.Game?.symbol == "FH6" && 
                        <div className="flex gap-2 lg:ml-auto bg-black/20 border-2 border-border py-1 px-2 rounded-lg items-center">
                            <p className="text-info font-black">FORZA</p>
                            <p className="text-white/60">HORIZON 6</p>
                        </div>}

                        
                    </div>
                    
                    <div className="flex flex-col lg:flex-row justify-between lg:items-center mb-5">

                        <div>
                            <p className="text-3xl lg:text-6xl font-bold mb-3">{current.name} Circuit</p>
                            <p className="text-white/60 mb-5">Compete for the highest drift scores on this legendary drift circuit.</p>
                        </div>
                        <div>
                            <TrackSelector/>
                        </div>
                    </div>
                            
                    <div className="flex gap-5 flex-col md:flex-row">
                        <div>
                            <div className="flex gap-5">
                                <div className="flex items-center gap-3">
                                    <RouteIcon height={18} strokeWidth={2} className="text-muted"/>
                                    <p>{current.length} mi</p>
                                </div>

                                <div className="w-[1px] bg-border"></div>

                                <div className="flex items-center gap-3">
                                    <UserIcon height={18} strokeWidth={2} className="text-muted"/>
                                    <p className="font-bold">{current.user_count}</p>
                                    <p className="hidden lg:inline-block text-muted text-sm">Users</p>
                                </div>

                                <div className="w-[1px] bg-border"></div>

                                <div className="flex items-center gap-3">
                                    <DocumentDuplicateIcon height={18} strokeWidth={1.8} className="text-muted"/>
                                    <p className="font-bold">{current.entries}</p>
                                    <p className="hidden lg:inline-block text-muted text-sm">Entries</p>
                                </div>
                            </div>
                        </div>

                        <div className="w-[1px] bg-border hidden md:inline-block"></div>

                        <div>
                            <ClassButton/>
                        </div>
                    </div>
                    
                </div>
                </>
            </PageHeader>

            <Container>
                <div className="pb-20">
                    <LeaderTable/>
                </div>
            </Container>
            
        </>
    )

}