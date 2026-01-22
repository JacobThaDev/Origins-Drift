import type { Metadata } from "next";

interface RootLayoutTypes {
    children: React.ReactNode;
}

export async function generateMetadata(): Promise<Metadata> {
    return {
        title: "Club Guidelines",
        description: `Every great drift club runs on respect, skill, and good vibes. Follow these rules to keep Origins the best drifting community in Forza Horizon.`,
    };
}

export default async function RootLayout({ children }: RootLayoutTypes) {

    return (
        <>
            {children}
        </>
    );
    
}