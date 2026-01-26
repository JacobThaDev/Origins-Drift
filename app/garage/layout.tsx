import { CarsContextProvider } from "@/providers/CarsProvider";
import { GarageContextProvider } from "@/providers/GarageProvider";
import type { Metadata } from "next";

interface RootLayoutTypes {
    children: React.ReactNode;
}

export async function generateMetadata(): Promise<Metadata> {
    return {
        title: "Drift Garage",
        description: `Build your ultimate drift garage. Add up to 15 of your favorite drift cars and show them off on your profile.`,
    };
}

export default async function RootLayout({ children }: RootLayoutTypes) {

    return (
        <GarageContextProvider>
            <CarsContextProvider>
                {children}
            </CarsContextProvider>
        </GarageContextProvider>
    );
    
}