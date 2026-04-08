import SignInButton from "@/components/global/SignInButton"

const Unauthorized = () => {
    return(
        <div className="flex items-center justify-center w-full h-full">
            <div className="w-full text-center">
                <p className="font-black text-7xl">401</p>
                <div className="w-[50px] bg-border my-3"></div>
                <p className="mb-5">You must be logged in to access this page.</p>
                <SignInButton/>
            </div>
        </div>
    )
}

export default Unauthorized;