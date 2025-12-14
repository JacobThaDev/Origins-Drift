import Container from "../layout/Container";
import { ForzaHorizonIcon } from "../icons/ForzaHorizonIcon";

const HomeHeader = () => {
    return (
        <div className="bg-header w-full min-h-[700px] max-h-[700px] pt-36 flex justify-center items-center text-white">
            <Container>
                <div className="relative z-[1]">
                    <p className="text-lg mb-2">
                        - Welcome!
                    </p>
                    <p className="text-2xl lg:text-6xl font-black mb-5">
                        The premier destination for authentic 
                        drifters in Forza Horizon.
                    </p>
                    <p className="max-w-[1200px] lg:text-lg mb-5">
                        We are a group dedicated drifting enthusiasts from all around 
                        the world. See how you stack up against some of the best and submit your own scores 
                        once you've joined our club!
                    </p>

                    <p className="mb-3 text-white/70">Supported</p>

                    <ForzaHorizonIcon height={36}/>
                </div>
            </Container>
        </div>

    )
}

export default HomeHeader;