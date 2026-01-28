"use client"

import Container from "@/components/layout/Container";
import { formatNumber, getRelativeTime } from "@/utils/Functions";
import { LeadersTypes } from "@/utils/types/LeadersTypes";
import { FireIcon, StarIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const RecentDrifts = ({ recent } : { recent:LeadersTypes[] }) => {

    const start_limit = 3;
    const max_limit = 21;

    const [ limit, setLimit ] = useState<number>(start_limit);

    return(
        <div className="pb-10">
            <Container>
                <div>
                    <div className="flex items-center gap-5 py-4 mb-5">
                        <FireIcon height={30} className="text-info" />
                        <div>
                            <p className="text-sm text-muted">Drift History</p>
                            <p className="text-3xl font-bold">Last 25 <span className="text-info italic">Drifts</span></p>
                        </div>
                    </div>

                    
                    <div className="bg-card border-[1px] border-secondary rounded-xl mb-5">
                        <table className="custom-table w-full">
                            <tbody className="font-mono">
                                { recent && recent.map((recent:LeadersTypes, index:number) => {

                                    if (!recent.Track || index > limit - 1) {
                                        return;
                                    }

                                    return(
                                        <tr key={"recent-"+index}>
                                            <td className="hidden md:table-cell text-center">
                                                <StarIcon height={30} className="text-white/10 mx-auto"/>
                                            </td>
                                            <td className="ps-6 lg:ps-0 w-[150px] lg:w-auto">
                                                <div className="flex w-full gap-4 items-center">
                                                    <div className="hidden lg:inline-block">
                                                        <Image 
                                                            src={recent.Track.track_image}
                                                            className="rounded-md"
                                                            width={150}
                                                            height={150}
                                                            alt=""
                                                        />
                                                    </div>
                                                    <div>
                                                        <p className="truncate w-full max-w-[150px] sm:max-w-[200px] lg:max-w-full">
                                                            {recent.Track.name} Circuit
                                                        </p>
                                                        <p className="text-muted text-sm">
                                                            {recent.class}-{recent.class == "A" ? "800" : "900"}
                                                        </p>
                                                    </div>
                                                </div>

                                            </td>
                                            <td className="lg:w-[150px] px-3 lg:px-0">
                                                <p className="font-black lg:text-xl">
                                                    {recent.proof_url ? 
                                                    <Link target="_blank" 
                                                        href={recent.proof_url} 
                                                        rel="nofollow"
                                                        className="underline">
                                                        {formatNumber(recent.score, 0)}
                                                    </Link> 
                                                    : formatNumber(recent.score, 0)}
                                                </p>
                                            </td>
                                            <td className="hidden md:table-cell">
                                                <p className="text-muted text-sm">
                                                    {getRelativeTime(recent.createdAt)}
                                                </p>
                                            </td>
                                        </tr> 
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>
                    
                    <div className="flex items-center gap-4">
                        {limit > start_limit && <button onClick={() => setLimit(start_limit)} 
                            className="min-w-[90px] py-5 bg-card rounded-xl">
                            Reset
                        </button>}

                        <button onClick={() => setLimit(prev => prev + start_limit <= max_limit ? prev + start_limit : start_limit)} 
                            className="py-5 bg-card w-full rounded-xl">
                            { limit < max_limit ? "Show More" : "Hide"}
                        </button>
                    </div>
                        
                </div>
                
            </Container>
        </div>
    )
}

export default RecentDrifts;