"use client";

import LoadingBox from "@/components/global/LoadingBox";
import DriverStatistics from "@/components/profile/DriverStatistics";
import PublicProfileHeader from "@/components/profile/PublicProfileHeader";
import TrackRecords from "@/components/profile/TrackRecords";
import LocalApi from "@/services/LocalApi";
import { ProfileTypes } from "@/utils/types/ProfileTypes";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { use, useEffect, useState } from "react";

export default function PublicProfile({ params }: { params: Promise<{ discordId: string }>}) {

    const { discordId } = use(params);

    const [ member, setMember ]   = useState<ProfileTypes>();

    const [ mounted, setMounted ] = useState<boolean>();
    const [ error, setError ]     = useState<string>();
    const [ loading, setLoading ] = useState<boolean>(true);

    useEffect(() => {
        setMounted(true)
    }, []);

    useEffect(() => {
        if (!mounted) {
            return;
        }

        async function getUserData() {
            setLoading(true);

            const result:ProfileTypes = await LocalApi.get("/discord/member/"+discordId+"");

            if (result.error) {
                setError(result.error.message);
                setLoading(false);
                return;
            }

            setMember(result);
            setLoading(false);
        }

        getUserData();
    },// eslint-disable-next-line 
    [mounted]);

    if (loading) {
        return <LoadingBox message={"Fetching profile"} />
    }

    if (error) {
        return(
            <div className="w-full h-full flex  flex-col gap-10 items-center justify-center">
                <XMarkIcon height={80} strokeWidth={4}/>
                <div className="text-center">
                    <p className="text-sm text-muted">An error occured</p>
                    <p>{error}</p>
                </div>
            </div> 
        )
    }

    if (!member) {
        return null;
    }

    return (
        <>
            <PublicProfileHeader member={member}/>
            <DriverStatistics member={member}/>
            <TrackRecords member={member}/>
        </>
    );

}