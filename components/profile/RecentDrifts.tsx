"use client"

import Container from "@/components/layout/Container";
import { formatNumber, getRelativeTime } from "@/utils/Functions";
import { LeadersTypes } from "@/utils/types/LeadersTypes";
import { StarIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import Link from "next/link";

const RecentDrifts = ({ recent } : { recent:LeadersTypes[] }) => {
    return(
        <div className="pt-10">
            <Container>
                <div className="rounded-xl bg-card border-[1px] border-secondary">
                    <div className="flex items-center gap-6 p-6">
                        <StarIcon height={30} className="text-info" />
                        <div>
                            <p className="text-sm text-muted">Drift History</p>
                            <p className="text-2xl font-bold">Latest <span className="text-info italic">Drifts</span></p>
                        </div>
                    </div>

                    <table className="custom-table w-full">
                        <thead>
                            <tr>
                                <th className="w-[100px] max-w-[100px] hidden md:table-cell"></th>
                                <th className="text-start ps-3">Track</th>
                                <th className="text-start">Score</th>
                                <th className="text-start hidden md:table-cell">Date</th>
                            </tr>
                        </thead>
                        <tbody className="font-mono">
                            { recent && recent.map((recent:LeadersTypes, index:number) => {

                                if (!recent.Track) {
                                    return;
                                }

                                return(
                                    <tr key={"recent-"+index}>
                                        <td className="hidden md:table-cell text-center">
                                            <StarIcon height={30} className="text-white/10 mx-auto"/>
                                        </td>
                                        <td className="ps-6 lg:ps-0">
                                            <div className="flex w-full gap-4 items-center">
                                                <div className="hidden lg:inline-block">
                                                    <Image 
                                                        src={recent.Track.track_image}
                                                        className="rounded-md"
                                                        width={130}
                                                        height={150}
                                                        alt=""
                                                    />
                                                </div>
                                                <div>
                                                    <p className="truncate w-full max-w-[140px] sm:max-w-[200px]">
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
                                                <Link target="_blank" href="" className="underline">
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
                
            </Container>
        </div>
    )
}

export default RecentDrifts;