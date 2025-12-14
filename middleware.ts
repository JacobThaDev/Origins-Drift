import { NextRequest, NextResponse } from "next/server";
import { env as _env } from 'process';
import LocalApi from "./services/LocalApi";

export async function middleware(request: NextRequest) {
    try {
        const { data: session } = await LocalApi.get("/api/auth/get-session", {
            baseURL: request.nextUrl.origin,
            headers: {
                cookie: request.headers.get("cookie") || "", // Forward the cookies from the request
            },
        });

        if(!session) {
            return NextResponse.next();
            //return NextResponse.redirect(new URL("/login", request.url));
        }
        
        return NextResponse.next();
    } catch (e:any) {
        console.log(e)
    }
}

export const config = {
	matcher: [
        "/",
    ],
};