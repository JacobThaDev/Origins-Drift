import Navigation from "@/components/global/Navigation";
import SocialBar from "@/components/global/SocialBar";
import HomeHeader from "@/components/home/Header";
import TracksSection from "@/components/home/Tracks";

export default function Home() {

    return (
        <>
            <SocialBar/>
            <Navigation/>
            <HomeHeader/>
            <TracksSection/>

        </>
    );

}