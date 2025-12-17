import Particles from "./Particles";

const ParticlesCard = ({ className, children }: { className?:string, children?: React.ReactNode}) => {
    return(
        <div className={`bg-card ${className}`}>
            <Particles
                className="absolute top-0 bottom-0 left-0 right-0 !z-[0] rounded-2xl"
                quantity={30}
                ease={80}
                color={"#AEAEAE"}
                refresh
            />
            <div className="relative z-[1]">
                {children}
            </div>
        </div>
    )
}

export default ParticlesCard;