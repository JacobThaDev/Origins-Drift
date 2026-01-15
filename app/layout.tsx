import type { Metadata } from "next";

import "@/public/css/globals.css";
import "@/public/css/main.css";

import { Toaster } from "sonner";
import Providers from "./providers";
import SocialBar from "@/components/global/SocialBar";
import Navigation from "@/components/global/Navigation";
import { Analytics } from "@vercel/analytics/next"

export async function generateMetadata(): Promise<Metadata> {

    const site_name = process.env.NEXT_PUBLIC_SITE_NAME as string;
    const site_desc = process.env.NEXT_PUBLIC_SITE_DESCRIPTION as string;
    const site_url  = process.env.NEXT_PUBLIC_SITE_URL as string;
    const site_keys = (process.env.NEXT_PUBLIC_SITE_KEYWORDS as string).split(",");

    return {
        title: {
            default: "Home | "+site_name,
            template: "%s | "+site_name
        },
        description: site_desc,
        metadataBase: new URL(site_url),
        keywords: site_keys,
        icons: ["/img/logo.png"],
        alternates: {
            canonical: './',
        }
    };
}

interface RootLayoutTypes {
    children: React.ReactNode;
}

export default async function RootLayout({ children }: RootLayoutTypes) {
    
    return (
        <html lang="en">
            <body className={`bg-background antialiased overflow-x-hidden`}>
                <Providers>
                    <SocialBar/>
                    <Navigation/>
                    {children}
                </Providers>
                <Toaster />
                <Analytics/>
            </body>
        </html>
    );
    
}
