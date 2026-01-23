"use client"

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
            try {
                const results = await LocalApi.get("/stats");
                setStats(results);
                setLoading(false);
            } catch (err:any) {
                console.log(loading, err);
                setLoading(false);
            }
        }

        loadStats();
    },// eslint-disable-next-line
    [ mounted ]);

    return (
        <>
            <HomeHeader stats={stats}/>
            <HomeStats stats={stats}/>

            <div className="py-20" id="leaderboards">
                <Container>
                    <TracksSection/>
                </Container>
            </div>
        </>
    );

}