"use client";

import { WrenchIcon } from "../icons/WrenchIcon";
import PageHeader from "../layout/PageHeader";
import { CarIcon } from "../icons/CarIcon";
import { CarsContextTypes, useCarsContext } from "@/providers/CarsProvider";

const CarsHeader = () => {

    const { cars }:CarsContextTypes = useCarsContext();

    return(
        <PageHeader>
            <div className="text-start">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-info/10 border border-info/20 mb-8">
                    <div>
                        <CarIcon height={18} className="text-info" strokeWidth={2}/>
                    </div>
                    <span className="text-sm font-medium text-info">Cars</span>
                </div>

                <h1 className="text-5xl md:text-7xl lg:text-6xl font-black tracking-tight text-foreground mb-6 text-balance">
                    Car Database
                </h1>

                <p className="max-w-3xl text-muted text-lg md:text-xl text-muted-foreground mb-10 leading-relaxed text-pretty">
                    A complete collection of every car within Forza Horizon 5 including their full statistics.
                </p>
            </div>
        </PageHeader>
    );
}

export default CarsHeader;