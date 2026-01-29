"use client";

import LocalApi from "@/services/LocalApi";
import { formatNumber } from "@/utils/Functions";
import { ImgurDataTypes } from "@/utils/types/ImgurDataTypes";
import { TracksTypes } from "@/utils/types/TracksTypes";
import { CheckCircleIcon, CheckIcon, PresentationChartBarIcon, TrophyIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { TracksContextTypes, useTracksContext } from "@/providers/TracksProvider";
import Meteors from "@/components/misc/Meteors";
import GlowText from "@/components/misc/GlowText";
import { ScoresEntryTypes } from "@/utils/types/ScoresEntryTypes";

interface ConfirmBoxTypes {
    score: number|undefined;
    imgurData: ImgurDataTypes|undefined;
    activeTrack: TracksTypes;
    classFilter: string;
    reset: () => void;
    setShowConfirm: (arg1: boolean) => void;
}

const ConfirmBox = ({ 
    score, imgurData, activeTrack, classFilter, reset, setShowConfirm 
}: ConfirmBoxTypes) => {

    const [ loading, setLoading ] = useState<boolean>(false);
    const [ isPersonalBest, setIsPersonalBest ] = useState<boolean>(false);
    const [ error, setError ] = useState<string>();
    const [ submitted, setSubmitted ] = useState<ScoresEntryTypes>();
    const { perfIndex, loadLeaderboard }:TracksContextTypes = useTracksContext();
    
    const submitData = async() => {
        if (loading) {
            return;
        }

        setLoading(true);
        
        try {
            const result:ScoresEntryTypes = await LocalApi.post( "/tracks/"+activeTrack.short_name+"/"+perfIndex, {
                score: score as number,
                proof_url: imgurData?.link,
                delete_hash: imgurData?.deletehash
            });

            if (result.error) {
                setError(result.error);
                return;
            }
            
            setIsPersonalBest(result.new_pb ? result.new_pb : false);
            setSubmitted(result as ScoresEntryTypes);
            
            if (result.new_pb) {
                // only time we need to update the tracks on their end,
                // is if they hit a new pb so they can see that immediately
                loadLeaderboard(false);
            }
            
            setLoading(false);
        } catch (err:any) {
            console.log(err);
            setError(err.message);
            setLoading(false);
        }
    }

    const continueButton = () => {
        reset();
    }

    if (submitted) {
        if (isPersonalBest) {
            return (
                <div className="text-center relative overflow-hidden">
                    <Meteors/>
                    <div className="p-7 relative">
                        <TrophyIcon height={80} className="mx-auto mb-5 text-warning" strokeWidth={0.5}/>
                        <p className="text-white/60 text-sm">{activeTrack.name} ({submitted.result.class}-Class)</p>
                        <p className="text-xl mb-1">
                            New Personal Best!
                        </p>
                        
                        <p className="mt-5 mb-2 text-5xl text-warning font-black brightness-125">
                            <GlowText text={formatNumber(score)} />
                        </p>

                        <p className="mb-5 text-success">
                            +{formatNumber(submitted.result.score - submitted.result.personal_best)}

                        </p>

                        <div className="relative overflow-hidden rounded-xl">
                            <button 
                                onClick={() => continueButton()} className="flex items-center justify-center gap-2 px-5 py-3 glow-button hover:brightness-125 transition-all w-full rounded-xl">
                                <CheckIcon height={20} strokeWidth={4} /> Continue
                            </button>
                        </div>
                    </div>
                </div>
            )
        } else {
            return (
                <div className="text-center p-7">
                    <CheckCircleIcon height={80} className="mx-auto mb-5 text-success"/>
                    <p className="text-white/60">
                        Score saved! 
                    </p>

                    <p className="mb-3 text-xl">{activeTrack.name} ({submitted.result.class}-Class)</p> 

                    <p className="text-3xl font-black mb-5">
                        {formatNumber(submitted.result.score, 0)}
                    </p>

                    <button 
                        disabled={loading}
                        onClick={() => continueButton()} className="flex items-center justify-center gap-2 px-5 py-3 bg-success/70 hover:bg-success  transition-all w-full rounded-xl">
                        <CheckIcon height={20} strokeWidth={4} /> Continue
                    </button>
                </div>
            )
        }
    }

    if (error) {
        return null;
    }

    return (
        <div>
            <div className="p-7">
                <div className="text-center mb-5">
                    <p className="text-white/60">
                        Confirm Entry
                    </p>
                    <p className="mb-3 text-xl">{activeTrack.name} &#40;Class {classFilter.toUpperCase()}-{classFilter.toUpperCase() == "A" ? 800 : 900}&#41;</p> 
                    <div className="flex items-center justify-center gap-3 text-2xl font-black">
                        <PresentationChartBarIcon height={30} className="text-warning"/>
                        {formatNumber(score, 0)}
                    </div>  
                </div>
                
                {imgurData && 
                <div className="mb-5">
                    <Link href={`https://imgur.com/${imgurData.id}`} className="text-sm text-center mb-5" target="_blank">
                        <Image src={imgurData.link} width={400} height={150} alt="" className="rounded-xl"/>
                    </Link>
                </div>}
                
                <div className="flex gap-3">
                    <button
                        disabled={loading}
                        onClick={() => setShowConfirm(false)} className="disabled:opacity-50 px-5 py-3 bg-danger/30 hover:bg-danger transition-all rounded-xl text-nowrap">
                        Cancel
                    </button>
                    
                    <button 
                        disabled={loading}
                        onClick={() => submitData()} className="disabled:opacity-50 flex items-center justify-center gap-2 px-5 py-3 bg-success/70 hover:bg-success  transition-all w-full rounded-xl">
                        <CheckIcon height={20} strokeWidth={4} /> Confirm
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ConfirmBox;