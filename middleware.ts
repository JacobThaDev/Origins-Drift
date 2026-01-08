import { NextRequest, NextResponse } from "next/server";
import { env as _env } from 'process';
import LocalApi from "./services/LocalApi";

export async function middleware(request: NextRequest) {
    const { pathname } = new URL(request.url);

    if (pathname == "/" || pathname == "/login") {
        return NextResponse.next();
    }

    try {
        const { data: session } = await LocalApi.get("/auth/get-session", {
            headers: {
                cookie: request.headers.get("cookie") || "", // Forward the cookies from the request
            },
        });

        const api_paths:string[] = [
            "/api/imgur/upload",
            "/api/imgur/delete/[deleteHash]",
        ];

        if(!session) {
            if (api_paths.includes(pathname)) {
                return NextResponse.json({
                    error: "You must be logged in to use this endpoint."
                })
            }

            return NextResponse.redirect(new URL("/login", request.url));
        }
        
        return NextResponse.next();
    } catch (e:any) {
        console.error(e)
    }
}

export const config = {
	matcher: [
        "/",
        "/api/imgur/upload",
        "/api/imgur/delete/[deleteHash]",
        "/dashboard",
    ]
};