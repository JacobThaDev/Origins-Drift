"use client";

import { formatNumber } from "@/utils/Functions";
import { TrophyIcon } from "@heroicons/react/24/outline";
import { RecordsTypes } from "@/utils/types/RecordsTypes";

interface TrackRecordsTypes {
    records: RecordsTypes[], 
    classType:"a"|"s1"
}

const TrackRecords = ({ records, classType = 'a' }:  TrackRecordsTypes) => {


    return(
        <div>
            <div className="flex items-center gap-5 mb-5">
                <div>
                    <p className="text-sm text-muted">Personal Best</p>
                    <p className="text-3xl font-bold">Track Records</p>
                </div>
            </div>

            <div className="grid grid-cols-1 bg-card rounded-xl overflow-hidden">
                {records && records.map((record:RecordsTypes, index:number) => {
                    return(
                        <div className={`relative p-4 ${index % 2 == 0 && "bg-secondary/40"}`} key={index}>
                            <div>
                                <div className="flex items-center gap-5 w-full">
                                    <TrophyIcon height={20} className="text-muted/50" />
                                    <p className="text-lg">
                                        {record.name}
                                    </p>
                                    <div className="flex items-center gap-2 ml-auto">
                                        
                                        <span className="font-semibold font-mono">
                                            {!record.top_score ? 0 : formatNumber(record.top_score)}
                                        </span>
                                    </div>
                                </div> 
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
)

    // return(
    //     <>
    //         <div className="py-20">
    //             <Container>
    //                 <div className="flex flex-col justify-center gap-4">
    //                     <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-12">
    //                         <div>
    //                             <p className="uppercase text-info font-bold mb-2">Track Scores</p>
    //                             <p className="text-3xl font-bold">Best performances by track</p>
    //                         </div>
    //                         <div className="max-w-lg text-white/70">
    //                             <button onClick={() => setActiveClass(activeClass == "S1" ? "A" : "S1")}
    //                                     className="flex items-center gap-3 px-5 py-3 rounded-lg border-2 group border-border hover:border-info hover:bg-info hover:text-black transition-all">
    //                                  <SpeedIcon height={18} strokeWidth={2.5} className="text-info group-hover:text-black transition-all" />
    //                                 <p>PI {activeClass}-{activeClass == "A" ? 800 : 900}</p>
    //                             </button>
    //                         </div>
    //                     </div>
    //                 </div>
            
    //                 <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-5 mb-10">
    //                     {records && records[activeClass].map((record:ProfileRecordsTypes, index:number) => {
    //                         const track:TracksTypes = record.Track;

    //                         return(
                                // <div className="h-full bg-card rounded-2xl relative overflow-hidden transition-all duration-300 border-2 border-border hover:border-info/30" key={index}>
                                //     <div className="h-[170px] rounded-2xl flex items-end px-7 pb-3 relative">
                                //         <Image 
                                //             src={"/img/tracks/headers/"+track.short_name+".jpg"} 
                                //             width={1920}
                                //             height={1080}
                                //             alt=""
                                //             className={`absolute rounded-2xl h-auto w-full bottom-0 left-0 opacity-40`}/>
                                //         <div className="absolute top-0 bottom-0 left-0 w-full bg-gradient-to-b from-transparent to-card"/>
                                        
                                //         <div className="relative flex justify-between items-center w-full">
                                //             <p className="text-2xl font-bold">
                                //                 {track.name} Circuit
                                //             </p>
                                //             <p className="font-mono text-info text-lg font-bold">
                                //                 {track.length}mi
                                //             </p>
                                //         </div>
                                //     </div>

                                //     <div className="p-7 pt-1">
                                //         <div className="flex items-center gap-5 w-full">
                                //             <div className="flex items-center gap-2">
                                //                 <TrophyIcon height={20} className="text-warning" />
                                //                 <span className="font-bold">
                                //                     {!record.max_score ? 0 : formatNumber(record.max_score)}
                                //                 </span>
                                //             </div>

                                //             <div className="ml-auto">
                                //                 {record.class}-{record.class.toLowerCase() === 'a' ? "800" : "900"}
                                //             </div>
                                //         </div> 
                                //     </div>
                                // </div>
    //                         )
    //                     })}
    //                 </div>
    //             </Container>
    //         </div>
    //     </>
    // )
}

export default TrackRecords;