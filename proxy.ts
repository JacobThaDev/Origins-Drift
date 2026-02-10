import { NextRequest, NextResponse } from "next/server";
import { env as _env } from 'process';
import LocalApi from "./services/LocalApi";

export async function proxy(request: NextRequest) {
    try {
        const session = await LocalApi.get("/auth/get-session", {
            headers: {
                cookie: request.headers.get("cookie") || "", // Forward the cookies from the request
            },
        });

        if(!session) {
            return NextResponse.redirect(new URL("/login", request.url));
        }

        return NextResponse.next();
    } catch (e:any) {
        console.error(e)
    }
}

export const config = {
	matcher: [
        "/dashboard",
    ]
};