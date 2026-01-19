import { PlusCircleIcon } from "@heroicons/react/24/outline";
import { TracksContextTypes, useTracksContext } from "@/providers/TracksProvider";
import Image from "next/image";
import { useEffect, useState } from "react";
import LocalApi from "@/services/LocalApi";
import { ImgurDataTypes } from "@/utils/types/ImgurDataTypes";
import { ProfileContextTypes, useProfileContext } from "@/providers/ProfileProvider";
import ConfirmBox from "./submissions/ConfirmBox";
import Particles from "../misc/Particles";
import SubmitScoreForm from "./submissions/SubmitScoreForm";

const SubmitButton = () => {

    const { current, perfIndex }:TracksContextTypes = useTracksContext();
    const { profile }:ProfileContextTypes = useProfileContext();

    const [ imgurData, setImgurData ] = useState<ImgurDataTypes>();
    const [ error, setError ]         = useState<string>();
    const [ modalOpen, setModalOpen ] = useState<boolean>(false);
    const [ uploading, setUploading ] = useState<boolean>(false);
    const [ progress, setProgress ]   = useState<number>(0);
    const [ score, setScore ]         = useState<number>();
    const [ showConfirm, setShowConfirm ] = useState<boolean>(false);

    useEffect(() => {
        // fixes a bug with the modal when pressing the back button.
        return () => document.body.classList.remove('overflow-y-hidden')
    }, // eslint-disable-next-line
    []);
    
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

        /*if (!imgurData || !imgurData.link) {
            setError("You must provide a proof image.");
            return;
        }*/

        setShowConfirm(true);
    }

    return(
        <>
        <button onClick={() => toggleModal()}
                className="relative flex overflow-hidden text-center glow-button hover:brightness-125 rounded-lg transition-all duration-500">
            <Particles className="absolute h-full w-full" quantity={30}/>
            <div className="bg-black/20 min-h-full py-2.5 px-3 flex justify-center items-center">
                <PlusCircleIcon height={30}/>
            </div>
            <p className="flex items-center leading-[1em] px-5 lg:justify-center text-white transition-all duration-500 text-center font-bold">
                Add Score
            </p>
        </button>

        {modalOpen && 
        <div className="flex fixed justify-center items-center top-0 left-0 w-full h-full z-[1001] bg-black/30 backdrop-blur-sm px-[2em] overflow-y-auto py-5">
            <div className="bg-card rounded-2xl w-full max-w-[400px]">
                {!showConfirm ? 
                <>
                    <Image src={current.track_image} 
                        className="rounded-2xl"
                        width={450} 
                        height={150} alt=""/>

                    <SubmitScoreForm
                        score={score}
                        uploading={uploading}
                        setUploading={setUploading}
                        imgurData={imgurData}
                        setImgurData={setImgurData}
                        setScore={setScore}
                        error={error}
                        setError={setError}
                        progress={progress}
                        setProgress={setProgress}
                        toggleModal={toggleModal}
                        deleteImage={deleteImage} 
                        validate={validate}/>
                </> : 
                <ConfirmBox 
                    score={score}
                    profile={profile}
                    activeTrack={current}
                    classFilter={perfIndex}
                    imgurData={imgurData}
                    setShowConfirm={setShowConfirm}
                    reset={reset}/> 
                }
            </div>
        </div>}
        </>
    )
}

export default SubmitButton;