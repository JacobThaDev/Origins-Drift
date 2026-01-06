import { ArrowUpTrayIcon, PlusIcon, TrashIcon, XMarkIcon } from "@heroicons/react/24/outline";
import Meteors from "../misc/Meteors";
import { TracksContextTypes, useTracksContext } from "@/providers/TracksProvider";
import Image from "next/image";
import TrackSelector from "./TrackSelector";
import { useCallback, useState } from "react";
import {useDropzone} from 'react-dropzone'
import LocalApi from "@/services/LocalApi";
import { ImgurDataTypes } from "@/utils/types/ImgurDataTypes";
import Link from "next/link";

const SubmitButton = () => {

    const { activeTrack }:TracksContextTypes = useTracksContext();
    const [ imgurData, setImgurData ] = useState<ImgurDataTypes>();
    const [ error, setError ] = useState<string>();
    const [ modalOpen, setModalOpen ] = useState<boolean>(false);
    const [ uploading, setUploading ] = useState<boolean>(false);
    const [ progress, setProgress ] = useState<number>(0);

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
            
            console.log("File Size: "+file.size);

            setError(undefined);
            setUploading(true);
            setProgress(0); // Reset progress at start

            const base64 = (reader.result as string).split(",")[1];
            const imgurFormData = new FormData();

            imgurFormData.append("image", base64);

            const result = await LocalApi.post("imgur/upload", imgurFormData, {
                // This is the key part for progress tracking
                onUploadProgress: (progressEvent) => {
                    if (progressEvent.total) {
                        const percentCompleted = Math.round(
                            (progressEvent.loaded * 100) / progressEvent.total
                        );
                        setProgress(percentCompleted);
                    }
                }
            }).then(r => r.data);

            if (result.success && result.status == 200) {
                console.log(result.data);
                setImgurData(result.data);
            }
                
            setUploading(false);
            setProgress(0);
        }

        reader.readAsDataURL(acceptedFiles[0])
    },// eslint-disable-next-line 
    []);
    
    const { getRootProps, getInputProps } = useDropzone({onDrop})
    
    /**
     * Toggles the modal to add a new score
     */
    const toggleModal = () => {
        if (!modalOpen)
            document.body.classList.add('overflow-y-hidden')
        else
            document.body.classList.remove('overflow-y-hidden')
        setModalOpen(!modalOpen);
    }

    /**
     * Deletes the uploaded image on Imgur and removes image from UI
     */
    const deleteImage = async() => {
        if (!imgurData) {
            return;
        }

        const deleteHash = imgurData.deletehash;
        setImgurData(undefined);

        try {
            //deletes image on imgur servers
            await LocalApi.delete(`imgur/delete/${deleteHash}`).then(r => r.data);
        } catch (err:any) {
            console.log(err);
        }
    }

    return(
        <>
        <button onClick={() => toggleModal()}
            className="relative overflow-hidden inline-block text-center bg-infodark/70 hover:bg-infodark w-full rounded-xl transition-all duration-500 mb-3">
            <Meteors />

            <div className="flex items-center gap-3">
                <p className="text-white transition-all duration-500 font-bold text-center w-full">
                    Add New Score
                </p>
                <div className=" bg-black/20 min-w-[60px] h-[60px] flex items-center justify-center ml-auto">
                    <PlusIcon height={24} />
                </div>
            </div>
        </button>

        {modalOpen && 
        <div className="flex fixed justify-center items-center top-0 left-0 w-full h-full z-[1001] bg-black/30 backdrop-blur-sm px-[2em] overflow-y-auto py-5">
            <div className="bg-card rounded-2xl w-full max-w-[400px]">
                <Image src={activeTrack.track_image} 
                    className="rounded-2xl"
                    width={450} 
                    height={150} alt=""/>
                <div className="p-7">
                    <TrackSelector/>

                    <div className="flex mb-3">
                        <div className="rounded-l-xl w-[120px]">
                            <select className="bg-button custom-select text-white py-4 w-full outline-0 text-center rounded-l-xl">
                                <option value="a">A-800</option>
                                <option value="a">S1-900</option>
                            </select>
                        </div>
                        <input type="number" min={1} max={2000000} className="bg-button outline-0 rounded-r-xl w-full ps-3 border-l-2 border-l-card"
                            placeholder="Type your score here" required/>
                    </div>

                    {error && 
                    <div className="bg-danger/30 flex items-center justify-between border-2 border-danger rounded-xl p-4 text-sm mb-3 text-center">
                        {error}
                        <button onClick={() => setError(undefined)}>
                            <XMarkIcon height={20}/>
                        </button>
                    </div>}

                    {imgurData ? 
                    <div className="relative mb-3">
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
                    <div {...getRootProps()} className="bg-black/20 py-4 text-center rounded-xl hover:cursor-pointer border-dashed border-2 border-button mb-3">
                        <input {...getInputProps()} />
                        <ArrowUpTrayIcon height={20} className="mx-auto"/>
                        <p>
                            {progress > 0 ? "Uploading: "+progress+"%" : "Drop your proof here"}
                        </p>
                        <p className="text-xs text-white/50">
                            Accepted png or jpg, max 10mb
                        </p>
                    </div>}

                    <div className="flex gap-3">
                        <button onClick={toggleModal} className="bg-button hover:bg-danger px-5 py-3 rounded-xl">
                            Cancel
                        </button>
                        <button 
                            onClick={() => {}} 
                            className="bg-success/70 hover:bg-success rounded-xl w-full">
                            Submit Score
                        </button>
                    </div>
                </div>
            </div>
        </div>}
        </>
    )
}

export default SubmitButton;