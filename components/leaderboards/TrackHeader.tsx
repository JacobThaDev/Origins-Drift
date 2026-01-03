"use client";

import { TracksContextTypes, useTracksContext } from "@/providers/TracksProvider";
import Container from "../layout/Container";
import Image from "next/image";

const TrackHeader = () => {

    const { activeTrack }:TracksContextTypes = useTracksContext();

    if (!activeTrack) {
        return null;
    }
    
    const bgImage = `/img/tracks/headers/${activeTrack.short_name}.jpg`;

    return (
        <>
            <div style={{ backgroundImage: `url(${bgImage})`}}
                className={`bg-track w-full min-h-[350px] max-h-[350px] lg:min-h-[400px] lg:max-h-[400px] pt-40 flex items-center text-white`}>
                <Container>
                    <div className="flex items-center gap-10">
                        <div>
                            <p className="text-3xl lg:text-5xl font-bold mb-3">{activeTrack.name} Circuit</p>
                            <p>Track Length: {activeTrack.length} mi</p>
                        </div>
                    </div>
                </Container>
            </div>
        </>
    )
}

export default TrackHeader;