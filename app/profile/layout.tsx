import type { Metadata } from "next";

interface RootLayoutTypes {
    children: React.ReactNode;
}

export async function generateMetadata(): Promise<Metadata> {
    try {
        return {
            title: "Profile",
            description: `View and edit your public profile.`,
        };
    } catch (e:any) {
        console.error(e);
        return {
            title: "Error"
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