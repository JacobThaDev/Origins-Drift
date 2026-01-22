import type { Metadata } from "next";

interface RootLayoutTypes {
    children: React.ReactNode;
}

export async function generateMetadata(): Promise<Metadata> {
    return {
        title: "Members List",
        description: `Our Leaders, crew members, and other drifters.`,
    };
}

export default async function RootLayout({ children }: RootLayoutTypes) {

    return (
        <>
            {children}
        </>
    );
    
}