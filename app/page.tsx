import Navigation from "@/components/global/Navigation";
import SocialBar from "@/components/global/SocialBar";
import HomeHeader from "@/components/home/Header";
import Container from "@/components/layout/Container";
import Image from "next/image";
import Link from "next/link";

export default function Home() {

    return (
        <>
            <SocialBar/>
            <Navigation/>
            <HomeHeader/>

            <div className="w-full py-20 relative z-[1]">
                <Container>
                    <div className="flex items-center gap-5 mb-7">
                        <p className="font-bold text-2xl">
                            Our Favorite Tracks
                        </p>
                        <Link href="" className="mt-2 text-warning">All Tracks</Link>
                    </div>

                    <div className="flex flex-col md:flex-row items-center justify-center gap-5 group mb-10">
                        <div>
                            <Image unoptimized src="/img/tracks/plaza.png" width={1920} height={1080} alt=""
                                className="h-auto w-full rounded-2xl group-hover:grayscale group-hover:opacity-30 hover:!opacity-100 hover:!grayscale-0 relative hover:z-[1] transition-all duration-[450ms] hover:"/>
                        </div>
                        <div className="group">
                            <Image unoptimized src="/img/tracks/cathedral.png" width={1920} height={1080} alt=""
                                className="h-auto w-full rounded-2xl group-hover:grayscale group-hover:opacity-30 hover:!opacity-100 hover:!grayscale-0 relative hover:z-[2] transition-all duration-[450ms]"/>
                        </div>
                        <div>
                            <Image unoptimized src="/img/tracks/estadio.png" width={1920} height={1080} alt=""
                                className="h-auto w-full rounded-2xl group-hover:grayscale group-hover:opacity-30 hover:!opacity-100 hover:!grayscale-0 relative hover:z-[3] transition-all duration-[450ms]"/>
                        </div>
                    </div>

                    <div className="bg-card rounded-2xl">
                        <div className="p-10">
                            <p className="text-xl font-bold">
                                Latest Scores
                            </p>
                        </div>
                    </div>
                </Container>

            </div>

        </>
    );

}