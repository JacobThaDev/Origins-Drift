import Container from "../layout/Container";
import { ScoresTypes } from "@/utils/types/ScoresTypes";

const TrackHeader = ({ trackData }: { trackData: ScoresTypes}) => {
    const bgImage = `/img/tracks/headers/${trackData.track.short_name}.jpg`;
    
    return (
        <div 
            style={{ backgroundImage: `url(${bgImage})`}}
            className={`bg-track w-full min-h-[500px] max-h-[500px] pt-36 flex justify-center items-center text-white`}>
            <Container>
                <div className="relative z-[1]">
                    <p className="lg:text-lg mb-5">
                        Leaderboard
                    </p>
                    <p className="text-3xl lg:text-6xl font-black mb-5">
                        {trackData.track.name} Circuit
                    </p>
                    <p className="max-w-[1200px] lg:text-lg">
                        {trackData.game.name}
                    </p>
                </div>
            </Container>
        </div>
    )
}

export default TrackHeader;