"use client"

import LoadingBox from "@/components/global/LoadingBox";
import HomeHeader from "@/components/home/Header";
import HomeStats from "@/components/home/HomeStats";
import TracksSection from "@/components/home/Tracks";
import Container from "@/components/layout/Container";
import LocalApi from "@/services/LocalApi";
import { useEffect, useState } from "react";

export default function Home() {
    
    const [ stats, setStats ] = useState<any>();
    const [ mounted, setMounted ] = useState<boolean>(false);
    const [ loading, setLoading ] = useState<boolean>(true);

    useEffect(() => setMounted(true), []);

    useEffect(() => {
        if (!mounted) {
            return;
        }

        async function loadStats() {
            const results = await LocalApi.get("/stats");
            setStats(results);
            setLoading(false);
        }

        loadStats();
    }, [ mounted ]);

    if (loading) {
        return <LoadingBox message="Loading Stats"/>
    }

    return (
        <>
            <HomeHeader stats={stats}/>
            <HomeStats stats={stats}/>

            <div className="py-20" id="leaderboards">
                <Container>
                    <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-12">
                        <div>
                            <p className="uppercase text-info font-bold mb-2">Leaderboards</p>
                            <p className="text-3xl font-bold">Compete on Official Tracks</p>
                        </div>
                        <div className="max-w-lg text-muted">
                            <p>Submit your best drift scores and climb the rankings. Each track offers unique challenges for every skill level.</p>
                        </div>
                    </div>

                    <TracksSection/>
                </Container>
            </div>
        </>
    );

}