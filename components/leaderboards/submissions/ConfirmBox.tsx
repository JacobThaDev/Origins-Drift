"use client";

import LocalApi from "@/services/LocalApi";
import { formatNumber } from "@/utils/Functions";
import { BasicApiResponseType } from "@/utils/types/BasicApiResponseType";
import { ImgurDataTypes } from "@/utils/types/ImgurDataTypes";
import { LeadersTypes } from "@/utils/types/LeadersTypes";
import { TracksTypes } from "@/utils/types/TracksTypes";
import { UsersTypes } from "@/utils/types/UsersTypes";
import { CheckIcon, PresentationChartBarIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import PersonalBestBox from "./PersonalBestBox";
import ScoreSavedBox from "./ScoreSavedBox";
import { TracksContextTypes, useTracksContext } from "@/providers/TracksProvider";

interface ConfirmBoxTypes {
    score: number|undefined;
    profile: UsersTypes;
    imgurData: ImgurDataTypes|undefined;
    activeTrack: TracksTypes;
    classFilter: string;
    reset: () => void;
    setShowConfirm: (arg1: boolean) => void;
}

const ConfirmBox = ({ 
    score, profile, imgurData, activeTrack, classFilter, reset, setShowConfirm 
}: ConfirmBoxTypes) => {

    const [ loading, setLoading ] = useState<boolean>(false);
    const [ isPersonalBest, setIsPersonalBest ] = useState<boolean>(false);
    const [ error, setError ] = useState<string>();
    const [ submitted, setSubmitted ] = useState<LeadersTypes>();

    const { perfIndex, loadLeaderboard }:TracksContextTypes = useTracksContext();
    

    const submitData = async() => {
        if (loading) {
            return;
        }

        setLoading(true);
        
        try {
            const result:BasicApiResponseType = await LocalApi.post( "/tracks/"+activeTrack.short_name+"/"+perfIndex, {
                user_id: profile.id,
                game: "fh5",
                track: activeTrack.short_name,
                class: classFilter,
                score: score as number,
                proof_url: imgurData?.link,
                delete_hash: imgurData?.deletehash
            });

            if (result.error) {
                setError(result.error);
                return;
            }
            
            setIsPersonalBest(result.new_pb ? result.new_pb : false);
            setSubmitted(result.result as LeadersTypes);
            setLoading(false);
            loadLeaderboard(false);
        } catch (err:any) {
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
                <PersonalBestBox 
                    score={submitted.score} 
                    track={activeTrack} 
                    submitted={submitted} 
                    continueBtn={continueButton}/>
            )
        } else {
            return (
                <ScoreSavedBox 
                    track={activeTrack} 
                    loading={loading} 
                    data={submitted} 
                    continueBtn={continueButton}/>
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