import { ArrowUpTrayIcon, PlusCircleIcon, TrashIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { TracksContextTypes, useTracksContext } from "@/providers/TracksProvider";
import Image from "next/image";
import TrackSelector from "./TrackSelector";
import { useCallback, useEffect, useState } from "react";
import {useDropzone} from 'react-dropzone'
import LocalApi from "@/services/LocalApi";
import { ImgurDataTypes } from "@/utils/types/ImgurDataTypes";
import Link from "next/link";
import { LeaderboardContextTypes, useLeaderboardContext } from "@/providers/LeaderboardProvider";
import { ProfileContextTypes, useProfileContext } from "@/providers/ProfileProvider";
import ConfirmBox from "./ConfirmBox";
import Particles from "../misc/Particles";

const SubmitButton = () => {

    const { activeTrack }:TracksContextTypes = useTracksContext();
    const { profile }:ProfileContextTypes = useProfileContext();

    const [ imgurData, setImgurData ] = useState<ImgurDataTypes>();
    const [ error, setError ]         = useState<string>();
    const [ modalOpen, setModalOpen ] = useState<boolean>(false);
    const [ uploading, setUploading ] = useState<boolean>(false);
    const [ progress, setProgress ]   = useState<number>(0);
    const [ score, setScore ]         = useState<number>();
    const [ showConfirm, setShowConfirm ] = useState<boolean>(false);

    const { 
        classFilter, setClassFilter 
    }:LeaderboardContextTypes = useLeaderboardContext();

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
                setImgurData(result.data);
            }
                
            setUploading(false);
            setProgress(0);
        }

        reader.readAsDataURL(acceptedFiles[0])
    },// eslint-disable-next-line 
    []);

    useEffect(() => {
        // fixes a bug with the modal when pressing the back button.
        return () => document.body.classList.remove('overflow-y-hidden')
    }, // eslint-disable-next-line
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
     * resets the data and closes the modal
     */
    const reset = () => {
        toggleModal();
        setShowConfirm(false);
        setScore(undefined);
        setImgurData(undefined);
        setError(undefined);
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

    const validate = () => {
        if (!score || score <= 0) {
            setError("Score must be greater than 0!");
            return;
        }

        if (!imgurData || !imgurData.link) {
            setError("You must provide a proof image.");
            return;
        }

        setShowConfirm(true);
    }

    return(
        <>
        <button onClick={() => toggleModal()}
            className="relative flex overflow-hidden text-center bg-warning/50 hover:bg-warning/80 rounded-lg transition-all duration-500">
            
            <Particles className="absolute h-full w-full" quantity={30}/>
            <div className="bg-black/10 min-h-full p-2.5">
                <PlusCircleIcon height={30}/>
            </div>
           <p className="flex items-center leading-[1em] px-5 lg:justify-center text-white transition-all duration-500 font-bold text-center">
                Add Score
            </p>
        </button>

        {modalOpen && 
        <div className="flex fixed justify-center items-center top-0 left-0 w-full h-full z-[1001] bg-black/30 backdrop-blur-sm px-[2em] overflow-y-auto py-5">
            <div className="bg-card rounded-2xl w-full max-w-[400px]">
                {!showConfirm && 
                <Image src={activeTrack.track_image} 
                    className="rounded-2xl"
                    width={450} 
                    height={150} alt=""/>}

                {showConfirm && 
                <ConfirmBox 
                    score={score}
                    profile={profile}
                    activeTrack={activeTrack}
                    classFilter={classFilter}
                    imgurData={imgurData}
                    setShowConfirm={setShowConfirm}
                    reset={reset}
                />}

                {!showConfirm && <div className="p-7">

                    <div className="flex flex-col gap-3">
                        <TrackSelector/>

                        <div className="flex">
                            <div className="rounded-l-xl w-[120px]">
                                <select 
                                    onChange={(e:any) => setClassFilter(e.target.value)}
                                    className="bg-button custom-select text-white py-4 w-full outline-0 text-center rounded-l-xl">
                                    <option value="a">A-800</option>
                                    <option value="s1">S1-900</option>
                                </select>
                            </div>
                            <input 
                                onChange={(e:any) => setScore(e.target.value as number)}
                                defaultValue={score}
                                type="number" min={1} max={5000000} className="bg-button outline-0 rounded-r-xl w-full ps-3 border-l-2 border-l-card"
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
                            <button onClick={toggleModal} className="bg-button hover:bg-danger px-5 py-3 rounded-xl">
                                Cancel
                            </button>
                            <button 
                                onClick={() => validate()} 
                                className="bg-success/70 hover:bg-success rounded-xl w-full">
                                Submit Score
                            </button>
                        </div>
                    </div>
                </div>}
            </div>
        </div>}
        </>
    )
}

export default SubmitButton;