"use client";

import Link from "next/link";

const SignInButton = () => {

    return (
        <>
            <Link href="/login" className="bg-warning/30 hover:bg-warning/70 transition-all px-5 rounded-lg py-2">
                Sign In
            </Link>
        </>
    )
}

export default SignInButton;