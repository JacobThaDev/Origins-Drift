"use client";

import { LeaderboardContextTypes, useLeaderboardContext } from "@/providers/LeaderboardProvider";
import LocalApi from "@/services/LocalApi";
import { formatNumber } from "@/utils/Functions";
import { BasicApiResponseType } from "@/utils/types/BasicApiResponseType";
import { ImgurDataTypes } from "@/utils/types/ImgurDataTypes";
import { LeadersTypes } from "@/utils/types/LeadersTypes";
import { TracksTypes } from "@/utils/types/TracksTypes";
import { UsersTypes } from "@/utils/types/UsersTypes";
import { CheckCircleIcon, CheckIcon, PresentationChartBarIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const ConfirmBox = ({ score, profile, imgurData, activeTrack, classFilter, reset, setShowConfirm }: {
    score: number|undefined;
    profile: UsersTypes;
    imgurData: ImgurDataTypes|undefined;
    activeTrack: TracksTypes;
    classFilter: string;
    reset: () => void;
    setShowConfirm: (arg1: boolean) => void;
}) => {
    const [ loading, setLoading ] = useState<boolean>();
    const [ error, setError ] = useState<string>();
    const [ submitted, setSubmitted ] = useState<LeadersTypes>();

    const { loadScores }:LeaderboardContextTypes = useLeaderboardContext();
    
    const submitData = async() => {
        if (loading) {
            return;
        }

        setLoading(true);

        const postData = {
            user_id: profile.id,
            game: "fh5",
            track: activeTrack.short_name,
            class: classFilter,
            score: score as number, // TODO:
            proof_url: imgurData?.link,
        }
        
        try {
            const result:BasicApiResponseType = await LocalApi.post( "games/fh5/"+activeTrack.short_name, postData)
                .then(r => r.data);

            if (result.error) {
                setError(result.error);
            } else if (result.success) {
                setSubmitted(result.result as LeadersTypes);
            }
            setLoading(false);
            loadScores();
        } catch (err:any) {
            setError(err.message);
            setLoading(false);
        }
    }

    const continueButton = () => {
        reset();
    }

    return (
        <div className="p-7">
            {submitted ? 
            <div className="text-center">
                <CheckCircleIcon height={80} className="mx-auto mb-5 text-success"/>
                <p className="text-white/60">Score saved!</p>
                <p className="mb-3 text-xl">{activeTrack.name} ({submitted.class}-Class)</p> 

                <p className="text-3xl font-black mb-5">
                    {formatNumber(submitted.score, 0)}
                </p>

                <button 
                    disabled={loading}
                    onClick={() => continueButton()} className="flex items-center justify-center gap-2 px-5 py-3 bg-success/70 hover:bg-success  transition-all w-full rounded-xl">
                    <CheckIcon height={20} strokeWidth={4} /> Continue
                </button>
            </div> : 
            <>
                <div className="text-center mb-5">
                    <p className="text-white/60">Confirm Entry</p>
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
            </>
            }
        </div>
    )
}

export default ConfirmBox;