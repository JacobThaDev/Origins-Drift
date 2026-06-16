import { capitalize } from "@/utils/Functions";
import type { Metadata } from "next";

interface RootLayoutTypes {
    children: React.ReactNode;
}

interface MetaProps {
    params: Promise<{ classType:string; track: string; }>;
};

export async function generateMetadata({ params }: MetaProps): Promise<Metadata> {
    try {
        const { track, classType } = await params;
        const trackName = track.replace("_", " ").replace("%20", " ");
        
        return {
            title: capitalize(trackName)+" ("+classType.toUpperCase()+"-Class) Leaderboard",
            description: `Top 50 drifters on ${trackName} (${classType.toUpperCase()}-Class)`,
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