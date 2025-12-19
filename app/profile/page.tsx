import LocalApi from "@/services/LocalApi";
import { headers } from "next/headers";

export default async function Profile() {

    const header = await headers();

    try {
        const userData = await LocalApi.get("/profile", {
            headers: {
                cookie: header.get("cookie")
            },
        }).then(r => r.data);

        console.log(userData);
    } catch (e:any) {
        console.log(e);
        return null;
    }

    return (
        <>
            <div className={`bg-header bg-black w-full min-h-[350px] max-h-[350px] lg:min-h-[450px] lg:max-h-[450px] pt-36 flex justify-center items-center text-white`}/>

            <div className="flex items-start">
                
            </div>
        </>
    );

}