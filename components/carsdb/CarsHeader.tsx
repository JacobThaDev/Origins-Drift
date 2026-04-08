"use client";

import { WrenchIcon } from "../icons/WrenchIcon";
import PageHeader from "../layout/PageHeader";
import { CarIcon } from "../icons/CarIcon";
import { CarsContextTypes, useCarsContext } from "@/providers/CarsProvider";
import { InformationCircleIcon } from "@heroicons/react/24/outline";

const CarsHeader = () => {

    const { cars, makes }:CarsContextTypes = useCarsContext();

    return(
        <PageHeader>
                <>
                <div className="relative max-w-full text-start">
                    <div>
                        <p className="text-3xl lg:text-6xl font-bold mb-3">
                            Car Database
                        </p>
                        <p className="text-white/60 mb-3">
                            A complete collection of every car within Forza Horizon 5 including
                            <br/> their full statistics.
                        </p>
                    </div>

                    <div className="inline-flex items-center gap-4 text-in rounded-xl bg-card p-4 pe-7 border-2 border-border">
                        <div className="w-14 h-14 flex items-center justify-center bg-info/10 rounded-lg text-info">
                            <CarIcon strokeWidth={2} height={24}/>
                        </div>
                        <div>
                            <p className="text-xl font-black">{cars?.length} Models</p>
                            <p className="text-sm text-muted">{makes?.length} Automakers</p>
                        </div>
                    </div>
                </div>
                </>
            </PageHeader>
    );
}

export default CarsHeader;