"use client";

import { formatNumber } from "@/utils/Functions";
import { CarsDetailsTypes } from "@/utils/types/CarsDetailsTypes";
import { ArrowRightIcon, BoltIcon, ClockIcon, LinkIcon, PowerIcon, StopIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { SpeedIcon } from "../icons/SpeedIcon";
import { WeightIcon } from "../icons/WeightIcon";
import { useState } from "react";
import { MountainIcon } from "../icons/MountainIcon";
import { BrakingIcon } from "../icons/BrakingIcon";
import { HandlingIcon } from "../icons/HandlingIcon";
import { AccelIcon } from "../icons/AccelIcon";

interface SidebarTypes {
    details: CarsDetailsTypes|undefined;
    setDetails: (arg1:CarsDetailsTypes|undefined) => void;
    detailType?: "basic"|"advanced";
    setDetailType?: (arg1:"basic"|"advanced") => void;
}

const CarDetails = ({ details, setDetails }: SidebarTypes) => {


    const [ showDetails, setShowDetails ] = useState<boolean>(false);

    const closeModal = () => {
        document.body.classList.remove('overflow-y-hidden');
        setDetails(undefined);
    }

    if (!details) {
        return null;
    }

    const drivetrain = !details ? "" : (details.drivetrain.toLowerCase() == 'rear-wheel drive' ? 'RWD' :
                       details.drivetrain.toLowerCase() == 'front-wheel drive' ? 'FWD' : 'AWD');

    return(
        <div className="fixed md:px-[2em] top-0 left-0 flex items-center justify-center w-full h-full backdrop-blur-sm z-[1000]">
            
            <div className="bg-card flex flex-col md:rounded-xl overflow-hidden w-full md:max-w-2xl h-full md:h-auto border-button border-[1px]">
                
                <div className="relative p-6 pb-4 bg-gradient-to-br from-secondary to-card border-b-[1px] border-border">
                    <div className="flex gap-4">
                        <div className="flex items-center justify-center min-w-16 h-16 bg-danger rounded-lg">
                            <p className="font-bold text-2xl">
                                {details.make.substring(0, 1)}
                            </p>
                        </div>
                        <div className="w-full">
                            <p className="text-muted">
                                {details.year} {details.make}
                            </p>
                            <p className="text-2xl font-bold">
                                {details.model}
                            </p>

                            <div className="flex items-center gap-3 mt-2">
                                <span className="text-sm font-mono text-info font-semibold">
                                    {details.car_class}-{details.rating}
                                </span>
                                <span className="text-sm text-muted">|</span>
                                <span className="text-sm font-medium text-blue-400">
                                    {drivetrain}
                                </span>
                            </div>
                        </div>
                        <div>
                            <button onClick={() => closeModal()} className="absolute top-4 right-4 text-muted font-black bg-background/50 hover:bg-background rounded-lg w-8 h-8 flex items-center justify-center">
                                <XMarkIcon height={16} strokeWidth={3}/>
                            </button>
                        </div>
                    </div>
                </div>

                <div className="p-6 overflow-y-auto max-h-full">

                    <div className="grid grid-cols-1 md:grid-cols-3 items-center gap-3 mb-5">
                        <div className="bg-card rounded-xl bg-secondary/30 p-4 border-[1px] border-border flex md:inline-block items-center justify-between">
                            <div className="flex items-center gap-3 md:mb-2">
                                <BoltIcon height={20} className="text-warning" />
                                <p className="text-muted text-sm">Power</p>
                            </div>
                            <p className="text-lg lg:text-2xl font-bold">
                                {formatNumber(details.power, 0)}{" "}
                                <span className="text-sm font-normal text-muted">HP</span>
                            </p>
                        </div>

                        <div className="bg-card rounded-xl bg-secondary/30 p-4 border-[1px] border-border flex md:inline-block items-center justify-between">
                            <div className="flex items-center gap-3 md:mb-2">
                                <SpeedIcon height={20} className="text-danger" strokeWidth={2}/>
                                <p className="text-muted text-sm">Torque</p>
                            </div>
                            <p className="text-lg lg:text-2xl font-bold">
                                {formatNumber(details.torque, 0)}{" "}
                                <span className="text-sm font-normal text-muted">ft. lbs</span>
                            </p>
                        </div>

                        <div className="bg-card rounded-xl bg-secondary/30 p-4 border-[1px] border-border flex md:inline-block items-center justify-between">
                            <div className="flex items-center gap-3 md:mb-2">
                                <WeightIcon height={20} className="text-info" strokeWidth={2}/>
                                <p className="text-muted text-sm">Weight</p>
                            </div>
                            <p className="text-lg lg:text-2xl font-bold">
                                {formatNumber(details.weight, 0)}{" "}
                                <span className="text-sm font-normal text-muted">lbs</span>
                            </p>
                        </div>
                    </div>

                    <p className="uppercase font-bold text-white/80 mb-3">
                        PERFORMANCE
                    </p>

                    <div className="flex flex-col gap-2 mb-10">
                        <div>
                            <div className="flex items-center gap-2 mb-1 w-full">
                                <ArrowRightIcon height={14} />
                                <div className="text-muted">
                                    Speed
                                </div>
                                <div className="font-bold ml-auto">
                                    {details.speed}
                                </div>
                            </div>
                            <div className="w-full h-2 rounded-full relative overflow-hidden bg-background">
                                <div style={{ width: `${details.speed * 10}%` }} className={`absolute h-2 bg-info rounded-full`}></div>
                            </div>
                        </div>

                        <div>
                            <div className="flex items-center gap-2 mb-1 w-full">
                                <AccelIcon height={14} strokeWidth={1.5} />
                                <div className="text-muted">
                                    Acceleration
                                </div>
                                <div className="font-bold ml-auto">
                                    {details.acceleration}
                                </div>
                            </div>
                            <div className="w-full h-2 rounded-full relative overflow-hidden bg-background">
                                <div style={{ width: `${details.acceleration * 10}%` }}
                                    className={`absolute h-2 bg-warning rounded-full`}></div>
                            </div>
                        </div>

                        <div>
                            <div className="flex items-center gap-2 mb-1 w-full">
                                <HandlingIcon height={14} strokeWidth={2}/>
                                <div className="text-muted">
                                    Handling
                                </div>
                                <div className="font-bold ml-auto">
                                    {details.handling}
                                </div>
                            </div>
                            <div className="w-full h-2 rounded-full relative overflow-hidden bg-background">
                                <div style={{ width: `${details.handling * 10}%` }} 
                                    className={`absolute h-2 bg-success rounded-full`}></div>
                            </div>
                        </div>

                        <div>
                            <div className="flex items-center gap-2 mb-1 w-full">
                                <BrakingIcon height={14} strokeWidth={2} />
                                <div className="text-muted">
                                    Braking
                                </div>
                                <div className="font-bold ml-auto">
                                    {details.braking}
                                </div>
                            </div>
                            <div className="w-full h-2 rounded-full relative overflow-hidden bg-background">
                                <div style={{ width: `${details.braking * 10}%` }} 
                                    className={`absolute h-2 bg-danger rounded-full`}></div>
                            </div>
                        </div>

                        <div>
                            <div className="flex items-center gap-2 mb-1 w-full">
                                <MountainIcon height={14} strokeWidth={2}  />
                                <div className="text-muted">
                                    Offroad
                                </div>
                                <div className="font-bold ml-auto">
                                    {details.offroad}
                                </div>
                            </div>
                            <div className="w-full h-2 rounded-full relative overflow-hidden bg-background">
                                <div style={{ width: `${details.offroad * 10}%` }} className={`absolute h-2 bg-purple rounded-full`}></div>
                            </div>
                        </div>
                    </div>

                    <div className="flex gap-3 items-center mb-7">
                        <p className="uppercase font-bold text-white/80">
                            Detailed Stats
                        </p>
                        <button onClick={() => setShowDetails((prev) => !prev)} className="text-info">
                            {showDetails ? "Hide" : "Show"}
                        </button>
                    </div>

                    {showDetails &&
                    <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-3 mb-5">
                        <div className="bg-card rounded-xl bg-secondary/30 p-4 border-[1px] border-border flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <ClockIcon height={20} className="text-info" />
                                <p className="text-muted text-sm">0-60</p>
                            </div>
                            <p className="text-lg font-bold">
                                {formatNumber(details.A60, 0)}{" "}
                                <span className="text-sm font-normal text-muted">s</span>
                            </p>
                        </div>

                        <div className="bg-card rounded-xl bg-secondary/30 p-4 border-[1px] border-border flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <ClockIcon height={20} className="text-purple" />
                                <p className="text-muted text-sm">0-100</p>
                            </div>
                            <p className="text-lg font-bold">
                                {formatNumber(details.A100, 0)}{" "}
                                <span className="text-sm font-normal text-muted">s</span>
                            </p>
                        </div>

                        <div className="bg-card rounded-xl bg-secondary/30 p-4 border-[1px] border-border flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <StopIcon height={20} className="text-danger" />
                                <p className="text-muted text-sm">60-0</p>
                            </div>
                            <p className="text-lg font-bold">
                                {formatNumber(details.B60, 0)}{" "}
                                <span className="text-sm font-normal text-muted">ft</span>
                            </p>
                        </div>

                        <div className="bg-card rounded-xl bg-secondary/30 p-4 border-[1px] border-border flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <StopIcon height={20} className="text-warning" />
                                <p className="text-muted text-sm">100-0a</p>
                            </div>
                            <p className="text-lg font-bold">
                                {formatNumber(details.B100, 0)}{" "}
                                <span className="text-sm font-normal text-muted">ft</span>
                            </p>
                        </div>
                    </div>}


                </div>
            </div>
        </div>
    )
}

export default CarDetails;