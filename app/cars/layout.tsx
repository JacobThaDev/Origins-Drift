import { CarsContextProvider } from "@/providers/CarsProvider";
import { GarageContextProvider } from "@/providers/GarageProvider";
import type { Metadata } from "next";

interface RootLayoutTypes {
    children: React.ReactNode;
}

export async function generateMetadata(): Promise<Metadata> {
    return {
        title: "Cars DB",
        description: `A showcase of every car within Forza Horizon.`,
    };
}

export default async function RootLayout({ children }: RootLayoutTypes) {

    return (
        <CarsContextProvider>
            {children}
        </CarsContextProvider>
    );
    
}