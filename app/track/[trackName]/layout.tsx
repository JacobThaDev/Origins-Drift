import { capitalize } from "@/utils/Functions";
import type { Metadata } from "next";

interface RootLayoutTypes {
    children: React.ReactNode;
}

interface MetaProps {
    params: Promise<{ trackName: string }>;
};

export async function generateMetadata({ params }: MetaProps): Promise<Metadata> {
    try {
        const trackName = (await params).trackName.replace("_", " ").replace("%20", " ");
        
        return {
            title: capitalize(trackName)+" Leaderboard",
            description: `Top 50 drifters on ${trackName}`,
        };
    } catch (e:any) {
        console.error(e);
        return {
            title: "Unknown Tack"
        };
    }
}

export default async function RootLayout({ children }: RootLayoutTypes) {

    return (
        <>
            {children}
        </>
    );
    
}