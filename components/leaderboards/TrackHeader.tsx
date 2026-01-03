"use client";

import { TracksContextTypes, useTracksContext } from "@/providers/TracksProvider";

const TrackHeader = () => {

    const { activeTrack }:TracksContextTypes = useTracksContext();

    if (!activeTrack) {
        return null;
    }
    
    const bgImage = `/img/tracks/headers/${activeTrack.short_name}.jpg`;

    return (
        <>
            <div style={{ backgroundImage: `url(${bgImage})`}}
                className={`bg-track w-full min-h-[350px] max-h-[350px] lg:min-h-[400px] lg:max-h-[400px] pt-36 flex justify-center items-center text-white`}/>
        </>
    )
}

export default TrackHeader;