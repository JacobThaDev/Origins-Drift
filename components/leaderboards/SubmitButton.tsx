import { PlusIcon } from "@heroicons/react/24/outline";

const SubmitButton = () => {
    return(
        <>
        <button className="bg-infodark hover:brightness-125 px-4 py-2 rounded-lg text-sm flex items-center gap-2">
            <PlusIcon height={20}/>
            Submit Score
        </button>
        </>
    )
}

export default SubmitButton;