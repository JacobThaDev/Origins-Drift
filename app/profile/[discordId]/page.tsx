"use client";

import DriverStatistics from "@/components/profile/DriverStatistics";
import PublicProfileHeader from "@/components/profile/PublicProfileHeader";
import TrackRecords from "@/components/profile/TrackRecords";
import LocalApi from "@/services/LocalApi";
import { ProfileTypes } from "@/utils/types/ProfileTypes";
import { use, useEffect, useState } from "react";

export default function PublicProfile({ params }: { params: Promise<{ discordId: string }>}) {

    const { discordId } = use(params);

    const [ member, setMember ]   = useState<ProfileTypes>();

    const [ mounted, setMounted ] = useState<boolean>();
    const [ error, setError ]     = useState<string>();
    const [ loading, setLoading ] = useState<boolean>();

    useEffect(() => setMounted(true), []);

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