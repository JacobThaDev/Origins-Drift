"use client";

import { WrenchIcon } from "../icons/WrenchIcon";
import PageHeader from "../layout/PageHeader";
import { GarageContextTypes, useGarageContext } from "@/providers/GarageProvider";
import { CarIcon } from "../icons/CarIcon";

const GarageHeader = () => {

    const { garage }:GarageContextTypes = useGarageContext();

    return(
        <PageHeader>
            <div className="text-start">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-info/10 border border-info/20 mb-8">
                    <div>
                        <WrenchIcon height={18} className="text-info" strokeWidth={2}/>
                    </div>
                    <span className="text-sm font-medium text-info">Drift Garage</span>
                </div>

                <h1 className="text-5xl md:text-7xl lg:text-6xl font-black tracking-tight text-foreground mb-6 text-balance">
                    Your Drift Machines
                </h1>

                <p className="max-w-3xl text-muted text-lg md:text-xl text-muted-foreground mb-10 leading-relaxed text-pretty">
                    Build your ultimate drift garage. Add up to 15 of your favorite drift cars and show them off on your profile.
                </p>
                
                <div className="inline-flex items-center gap-4 text-in rounded-xl bg-card p-4 border-2 border-border">
                    <div className="w-14 h-14 flex items-center justify-center bg-info/10 rounded-lg text-info">
                        <CarIcon strokeWidth={2} height={24}/>
                    </div>
                    <div>
                        <p className="text-2xl font-black">{garage.length}</p>
                        <p className="text-sm text-muted">Cars in garage</p>
                    </div>
                </div>
            </div>
        </PageHeader>
    );
}

export default GarageHeader;