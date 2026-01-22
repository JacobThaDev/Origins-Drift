import type { Metadata } from "next";

interface RootLayoutTypes {
    children: React.ReactNode;
}

export async function generateMetadata(): Promise<Metadata> {
    return {
        title: "Login",
        description: `To create your account or to sign in, connect your Discord account for instant accesss.`,
    };
}

export default async function RootLayout({ children }: RootLayoutTypes) {

    return (
        <>
            {children}
        </>
    );
    
}