import Container from "../layout/Container";

const HomeHeader = () => {
    return (
        <div className="bg-header w-full min-h-[500px] pt-36 flex justify-center items-center text-white">
            <Container>
                <div className="relative z-[1]">
                    <p className="text-lg mb-2">Welcome to</p>
                    <p className="text-4xl lg:text-7xl font-black mb-5">Origins Drift Club</p>
                    <p className="max-w-[700px] text-lg">The premier destination for dedicated drifters in Forza Horizon.</p>
                </div>
            </Container>
        </div>

    )
}

export default HomeHeader;