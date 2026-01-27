"use client";

import LocalApi from "@/services/LocalApi";
import { GarageTypes } from "@/utils/types/GarageTypes";
import { ImgurDataTypes } from "@/utils/types/ImgurDataTypes";
import { PhotoIcon, TrashIcon } from "@heroicons/react/24/outline";
import { useCallback, useEffect, useRef, useState } from "react";
import { useDropzone } from 'react-dropzone';
import Image from "next/image";
import { GarageContextTypes, useGarageContext } from "@/providers/GarageProvider";

const CarGarageBlock = ({ car } : CarBlockTypes) => {

    const [ error, setError ] = useState<string>();
    const [ uploading, setUploading ] = useState<boolean>(false);
    const [ imgurData, setImgurData ] = useState<ImgurDataTypes>();

    const [ confirmImage, setConfirmImage ] = useState<boolean>(false);
    const [ confirmCar, setConfirmCar ] = useState<boolean>(false);

    const [ status, setStatus ] = useState<string>();
    const [ mounted, setMounted ] = useState<boolean>(false);

    const { garage, loadGarage }:GarageContextTypes = useGarageContext();

    useEffect(() => setMounted(true), []);
    
    useEffect(() => {
        if (!mounted) {
            return;
        }
        document.addEventListener("click", handleDocumentClick)
        return () => {
            document.removeEventListener('click', handleDocumentClick);
        }
    }, [mounted]);

    const dropdownRef = useRef<HTMLDivElement>(null);

    const handleDocumentClick = (event: MouseEvent) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
            setConfirmCar(false);
            setConfirmImage(false)
        }
    }

    const onDrop = useCallback((acceptedFiles:File[]) => {
        if (uploading) {
            return;
        }

        const reader = new FileReader();

        reader.onabort = () => setError('file reading was aborted');
        reader.onerror = () => setError('file reading has failed');

        reader.onload  = async() => {
            const file:File = acceptedFiles[0];

            if (!file) {
                return;
            }

            const fileType = file.type;
            const allowedTypes = ['image/png', 'image/jpeg', 'image/jpg'];

            if (!allowedTypes.includes(fileType)) {
                setError('Only png or jpeg images are allowed');
                return;
            }

            if ((file.size / 1000 / 1000) > 10) {
                setError('Image can not exceed 10mb.');
                return;
            }

            setError(undefined);
            setUploading(true);
            setStatus("Uploading")

            const base64 = (reader.result as string).split(",")[1];
            const imgurFormData = new FormData();

            imgurFormData.append("image", base64);

            try {
                const result = await LocalApi.post("/imgur/upload", { 
                    image: base64
                });

                if (result.success && result.status == 200) {
                    setImgurData(result.data);
                }
            } catch(err:any) {
                console.error(err);
            }
                
            setUploading(false);
            
        }

        reader.readAsDataURL(acceptedFiles[0])
    },// eslint-disable-next-line 
    []);

    const { getRootProps, getInputProps } = useDropzone({onDrop})
    

    useEffect(() => {
        if (!imgurData) {
            return;
        }

        updateCar();
    },// eslint-disable-next-line 
    [ imgurData ]);

    const updateCar = async() => {
        if (!imgurData) {
            return;
        }

        setStatus("Updating Car")

        try {
            const result = await LocalApi.post("/garage/image/add", {
                car_id: car.car_id,
                image_url: imgurData.link,
                delete_hash: imgurData.deletehash
            });
            
            if (result.success) {
                loadGarage();
            }
        } catch (err:any) {
            console.error(err);
        }

        setStatus(undefined);
    }

    const removeImage = async() => {
        setStatus("Removing...");
        setConfirmImage(false);

        try {
            const result = await LocalApi.post("/garage/image/remove", { 
                car_id: car.car_id
            });

            if (result.success) {
                loadGarage();
            }
        } catch (err:any) {
            console.error(err);
        }

        setStatus(undefined);
    }

    const removeCar = async() => {
        setStatus("Removing...");
        setConfirmImage(false);

        try {
            const result = await LocalApi.post("/garage/remove", { 
                car_id: car.car_id
            });

            if (result.success) {
                const garage_copy = garage.map(r=>r);

                for (let i = 0; i < garage_copy.length; i++) {
                    if (garage_copy[i].car_id == car.car_id) {
                        garage_copy.splice(i, 1);
                    }
                }

                loadGarage()
            }
        } catch (err:any) {
            console.log(err);
        }

        setStatus(undefined);
    }

    const drivetrain_type = car.CarData.drivetrain.toLowerCase();

    const drivetrain = drivetrain_type == 'rear-wheel drive' ? 'rwd' :
            drivetrain_type == 'front-wheel drive' ? 'fwd' : 'awd';

    return(
        <div className="bg-card border-[1px] border-border rounded-xl p-4 hover:border-info/30 transition-colors">
            
            <div className="relative w-full h-[150px] rounded-lg overflow-hidden mb-4">
                
                <div className="absolute flex gap-3 z-[20] top-2 right-2 px-3 justify-between" ref={dropdownRef}>
                    {car.image_url && 
                        <button onClick={() => setConfirmImage(true)}
                            aria-label="Remove Image"
                            disabled={status != undefined} 
                            className="text-sm inline-flex items-center gap-2 bg-card/60 hover:bg-card/80 backdrop-blur-sm rounded-full hover:bg-card px-5 py-2 disabled:opacity-50 text-muted hover:text-white">
                            
                            <PhotoIcon height={18} strokeWidth={1.5}/>
                            <p>Remove</p>
                        </button>}
                    
                    <button onClick={() => setConfirmCar(true)} 
                        disabled={status != undefined} 
                        aria-label="Remove Car"
                        className="relative ml-auto w-10 h-10 rounded-full text-danger bg-card/60 hover:bg-card/80 backdrop-blur-sm inline-flex items-center justify-center">
                        <TrashIcon 
                            height={18} 
                            strokeWidth={2} />
                    </button>
                </div>

                {(confirmCar || confirmImage) && <>
                
                    <div className="absolute flex flex-col items-center justify-center top-0 left-0 w-full h-full bg-card/70 backdrop-blur-sm z-[20] rounded-lg overflow-hidden">
                        <p className="text-muted text-sm mb-5">Confirm Option</p>

                        {confirmImage && 
                        <button onClick={() => removeImage()}
                            aria-label="Remove Car"
                            disabled={status != undefined} 
                            className="inline-flex items-center gap-2 hover:bg-danger/30 rounded-full hover:bg-card px-5 py-2 disabled:opacity-50">
                            <TrashIcon height={18} strokeWidth={2} className="text-danger"/>
                            <div className="h-5 w-[1px] bg-danger"/>
                            <p className="text-danger font-semibold">Remove Image</p>
                        </button>}

                        {confirmCar && 
                        <button onClick={() => removeCar()}
                            aria-label="Remove Car"
                            disabled={status != undefined} 
                            className="inline-flex items-center gap-2 hover:bg-danger/30 rounded-full hover:bg-card px-5 py-2 disabled:opacity-50">
                            <TrashIcon height={18} strokeWidth={2} className="text-danger"/>
                            <div className="h-5 w-[1px] bg-danger"/>
                            <p className="text-danger">Remove Car</p>
                        </button>}


                        <button
                            onClick={() => { 
                                setConfirmImage(false)
                                setConfirmCar(false)
                            }}
                            aria-label="Remove Car"
                            disabled={status != undefined} 
                            className="inline-flex items-center gap-2 rounded-full hover:bg-card/50 px-5 py-2 disabled:opacity-50">
                            <p className="text-muted">cancel</p>
                        </button>
                    </div>
                </>}

                {car.image_url && 
                <div className="flex items-center justify-center absolute w-full h-full overflow-hidden">
                    <Image 
                        unoptimized
                        src={car.image_url} 
                        width={1920} height={1080} 
                        className="w-full min-w-[350px] opacity-80"
                        alt="" 
                        referrerPolicy="no-referrer"/>
                </div>}

                {!car.image_url && <div {...getRootProps()} className="hover:cursor-pointer inline-flex bg-secondary/50 relative z-[10] w-full h-full items-center justify-center overflow-hidden">
                    <input {...getInputProps()} />
                    
                    <div className="text-center">
                        <PhotoIcon height={30} className="mx-auto"/>
                        <p>
                            {status ? status : "Upload Photo"}
                        </p>
                        <p className="text-xs text-muted">
                            Click or drop a photo here.<br/>1920 x 1080 / 10mb
                        </p>
                    </div>
                </div>}
            </div>
            
            <div>
                <div className="flex mb-3">
                    <div className="truncate">
                        <p className="text-muted">{car.CarData.year} {car.CarData.make}</p>
                        <p className="text-lg font-semibold truncate">{car.CarData.model}</p>
                    </div>
                    <div className="ml-auto">
                        <p className="inline-flex justify-center rounded-lg items-center bg-secondary w-7 h-7 font-bold text-center text-sm text-white/50">
                            {car.CarData.car_class}
                        </p>
                    </div>
                </div>

                <div className="flex items-center gap-2 text-sm text-muted">
                    <p>{drivetrain.toUpperCase()}</p>
                    &bull;
                    <p>{car.CarData.power} BHP</p>
                    &bull;
                    <p>{car.CarData.engine_size}L {car.CarData.engine_type}</p>
                </div>
            </div>
        </div>
    )
}

interface CarBlockTypes {
    car: GarageTypes
}

export default CarGarageBlock;