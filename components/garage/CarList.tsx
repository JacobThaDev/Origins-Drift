"use client";

import { useState } from "react";
import Container from "../layout/Container";
import { CarsContextTypes, useCarsContext } from "@/providers/CarsProvider";
import { CarsDetailsTypes } from "@/utils/types/CarsDetailsTypes";
import { MagnifyingGlassIcon, XMarkIcon } from "@heroicons/react/24/outline";
import CarBlock from "./CarBlock";

const CarList = () => {

    const { cars, makes }:CarsContextTypes = useCarsContext();
    const [ make, setMake ]     = useState<string>();
    const [ search, setSearch ] = useState<string>();

    return(
        <>
            <div className="pb-24">
                <Container>

                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-start mb-10 gap-5">
                        <div className="text-nowrap">
                            <p className="font-bold text-3xl">
                                Browse Cars
                            </p>

                            <div className="flex items-center gap-4">
                                <p className="text-muted">
                                    {makes?.length} Makes
                                </p>
                                <div className="h-5 bg-border w-[1px]" />
                                <p className="text-muted">
                                    {cars?.length} Models
                                </p>
                            </div>
                        </div>

                        <div className="ml-auto w-full lg:max-w-[600px] relative">
                            <MagnifyingGlassIcon height={20}
                                className="absolute top-3 left-3"/>

                            <input type="text"
                                id="search-input"
                                onChange={(e:any) => setSearch(e.target.value)}
                                className="ps-10 bg-secondary border-card rounded-lg px-5 py-3 w-full"
                                placeholder={`${make ? `Search '${make}'` : 'Search make or model'}`}/>
                            
                            {search && 
                            <button 
                                onClick={() => {
                                    setSearch(undefined);
                                    const field:any = document.getElementById("search-input");
                                    if (field)
                                        field.value = '';
                                }} 
                                className="absolute top-3 right-3">
                                <XMarkIcon height={20}
                                    strokeWidth={2} />
                            </button>}
                        </div>

                        <div className="lg:hidden">
                            <select className="w-full py-3 px-5 bg-secondary rounded-lg" onChange={(e:any) => setMake(e.target.value)}>
                                <option value={undefined}>Select a Manufacturer</option>
                                {makes && makes.map((carmake:string, index:number) => {
                                    return(
                                        <option key={index} value={carmake}>
                                            {carmake}
                                        </option>
                                    )
                                })}
                            </select>
                        </div>
                    </div>
                    

                    <div className="flex items-start gap-6">

                        <div className="min-w-[250px] max-w-[250px] pe-3 hidden lg:inline-block">
                            <p className="font-bold text-xl text-white mb-5">
                                Manufacturer
                            </p>
                            <div className="h-full max-h-[600px] overflow-y-auto scrollbar">
                                {makes && makes.map((carmake:string, index:number) => {
                                    return(
                                        <button key={index} 
                                            onClick={() => make == carmake ? setMake(undefined) : setMake(carmake)} 
                                            className={`inline-block w-full text-start px-3 py-2 hover:bg-card ${carmake == make && "bg-card font-bold"}`}>
                                            {carmake}
                                        </button>
                                    )
                                })}
                            </div>
                        </div>

                        <div className="w-full">

                            <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-5">
                                <div>
                                    <p className="font-bold text-xl">
                                        {make ? make : search 
                                            ? "Search results" 
                                            : "Select a manufacturer or search for a car"}
                                    </p>
                                </div>
                            </div>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                {cars && cars.map((car:CarsDetailsTypes, index:number) => {
                                    return(
                                        <CarBlock car={car} makeFilter={make} search={search} 
                                            key={"car"+index} />
                                    )
                                })}
                            </div>
                        </div>
                    </div>
                    
                </Container>

            </div>
        </>
    );
}

export default CarList;