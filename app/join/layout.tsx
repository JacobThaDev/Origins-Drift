import type { Metadata } from "next";

interface RootLayoutTypes {
    children: React.ReactNode;
}

export async function generateMetadata(): Promise<Metadata> {
    return {
        title: "Join our Club",
        description: `Follow these steps to become an official member. Join our in-game club and Discord server to compete, connect, and climb the leaderboards.`,
    };
}

export default async function RootLayout({ children }: RootLayoutTypes) {

    return (
        <>
            {children}
        </>
    );
    
}