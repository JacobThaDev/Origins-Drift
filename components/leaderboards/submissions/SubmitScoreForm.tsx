"use client";

import Image from "next/image";
import { ArrowUpTrayIcon, TrashIcon, XMarkIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { useDropzone } from 'react-dropzone';
import LocalApi from "@/services/LocalApi";
import { useCallback } from "react";
import { ImgurDataTypes } from "@/utils/types/ImgurDataTypes";
import { TracksContextTypes, useTracksContext } from "@/providers/TracksProvider";

const SubmitScoreForm = ({ 
    score, setScore, imgurData, setImgurData, uploading, setUploading, error, setError,
    progress, setProgress, toggleModal, deleteImage, validate
}: SubmitScoreFormTypes) => {

    const { perfIndex }:TracksContextTypes = useTracksContext();

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
            setProgress(0); // Reset progress at start

            const base64 = (reader.result as string).split(",")[1];
            const imgurFormData = new FormData();

            imgurFormData.append("image", base64);

            const result = await LocalApi.post("/imgur/upload", { 
                image: base64
            });

            if (result.success && result.status == 200) {
                setImgurData(result.data);
            }
                
            setUploading(false);
            setProgress(0);
        }

        reader.readAsDataURL(acceptedFiles[0])
    },// eslint-disable-next-line 
    []);

    const { getRootProps, getInputProps } = useDropzone({onDrop})

    return (
        <div className="p-7">
            <div className="flex flex-col gap-3">
                <div className="flex">
                    <div className="rounded-l-xl w-[120px] py-4 bg-secondary text-center">
                        {perfIndex.toUpperCase()}-{perfIndex == "a" ? "800" : "900"}
                    </div>
                    <input 
                        onChange={(e:any) => setScore(e.target.value as number)}
                        defaultValue={score}
                        type="number"
                        min={1} 
                        max={5000000} 
                        className="bg-secondary outline-0 rounded-r-xl w-full ps-3 border-l-2 border-l-card"
                        placeholder="Type your score here" required/>
                </div>

                {imgurData ? 
                <div className="relative">
                    <div className="h-[200px] overflow-hidden rounded-xl relative flex items-center justify-center">
                        <Image src={imgurData.link} width={400} height={150} alt="" className="rounded-xl"/>
                    </div>
                    <div className="absolute top-3 right-3">
                        <button onClick={() => deleteImage()} className="bg-danger rounded-full p-2">
                            <TrashIcon height={24}/>
                        </button>
                    </div>
                    <div className="text-center">
                        <Link href={`https://imgur.com/${imgurData.id}`} className="text-sm text-center" target="_blank">
                            https://imgur.com/{imgurData.id}
                        </Link>
                    </div>
                </div>
                : 
                <div {...getRootProps()} className="bg-black/20 py-4 text-center rounded-xl hover:cursor-pointer border-dashed border-2 border-button">
                    <input {...getInputProps()} />
                    <ArrowUpTrayIcon height={20} className="mx-auto"/>
                    <p>
                        {progress > 0 ? "Uploading: "+progress+"%" : "Drop your proof here"}
                    </p>
                    <p className="text-xs text-white/50">
                        Accepted png or jpg, max 10mb
                    </p>
                </div>}

                {error && 
                <div className="bg-danger/30 flex items-center justify-between border-2 border-danger rounded-xl p-4 text-sm text-center">
                    {error}
                    <button onClick={() => setError(undefined)}>
                        <XMarkIcon height={20}/>
                    </button>
                </div>}

                <div className="flex gap-3">
                    <button onClick={toggleModal} className="bg-secondary hover:bg-danger px-5 py-3 rounded-xl">
                        Cancel
                    </button>
                    <button 
                        onClick={() => validate()} 
                        className="bg-success/70 hover:bg-success rounded-xl w-full">
                        Submit Score
                    </button>
                </div>
            </div>
        </div>
    )
}

interface SubmitScoreFormTypes {
    score: number|undefined;
    setScore: (arg1: number) => void;
    imgurData: ImgurDataTypes|undefined;
    setImgurData: (arg1: ImgurDataTypes|undefined) => void;
    uploading: boolean|undefined;
    setUploading: (arg1: boolean) => void;
    error: string|undefined;
    setError: (arg1: string|undefined) => void;
    progress: number;
    setProgress: (arg1:number) => void;
    toggleModal: () => void;
    deleteImage: () => void;
    validate: () => void;
}

export default SubmitScoreForm;