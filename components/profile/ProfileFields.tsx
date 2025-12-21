"use client";

import { UsersTypes } from "@/utils/types/UsersTypes";

const ProfileFields = ({ userData }: { userData:UsersTypes }) => {
    return(
        <>
            <p>{userData.AccountData?.about_me}</p>
        
        </>
    )
}

export default ProfileFields;