import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
    /*try {
        const { data: session } = await LocalApi.get("/api/auth/get-session", {
            baseURL: request.nextUrl.origin,
            headers: {
                cookie: request.headers.get("cookie") || "", // Forward the cookies from the request
            },
        });

        if(!session) {
            return NextResponse.redirect(new URL("/login", request.url));
        }

        if (!savedSettings) {
            savedSettings = await LocalApi.get("settings/basic")
                .then(r => r.data);
        }

        const admins = savedSettings.site_admins;

        if (!admins.includes(session.user.email)) {
            return NextResponse.redirect(new URL("/login", request.url));
        }

        return NextResponse.next();
    } catch (e:any) {
        console.log(e)
    }*/
}

export const config = {
	matcher: [
        "/api/admin",
        "/api/admin/stats",
        "/api/admin/settings",
        "/api/admin/stats",
        "/api/admin/store",
        "/api/admin/store/ban",
        "/api/admin/store/ban/[captureId]",
        "/api/admin/store/products",
        "/api/admin/store/categories",
        "/api/admin/store/modes",
        "/api/admin/store/payments",
        "/api/admin/store/purchases",
        "/api/admin/store/purchases/[captureId]",
        "/api/admin/vote",
        "/dashboard",
        "/dashboard/settings",
        "/dashboard/payments",
        "/dashboard/updates",
        "/dashboard/store/products",
        "/dashboard/store/modes",
        "/dashboard/store/categories",
        "/dashboard/voting/links",
        "/dashboard/voting/users",
    ],
};