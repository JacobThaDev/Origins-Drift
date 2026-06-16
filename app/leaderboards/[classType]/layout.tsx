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
        const { classType } = await params;
        return {
            title: capitalize(classType)+"-Class Leaderboards",
            description: `${classType.toUpperCase()}-Class Leaderboards`,
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