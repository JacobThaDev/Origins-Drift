import type { Metadata } from "next";

interface RootLayoutTypes {
    children: React.ReactNode;
}

export async function generateMetadata(): Promise<Metadata> {

    const site_name = process.env.NEXT_PUBLIC_SITE_NAME as string;
    const site_desc = process.env.NEXT_PUBLIC_SITE_DESCRIPTION as string;
    const site_url  = process.env.NEXT_PUBLIC_SITE_URL as string;
    const site_keys = (process.env.NEXT_PUBLIC_SITE_KEYWORDS as string).split(",");

    return {
        title: {
            default: "Test | "+site_name,
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

export default async function RootLayout({ children }: RootLayoutTypes) {

    return (
        <>
            {children}
        </>
    );
    
}