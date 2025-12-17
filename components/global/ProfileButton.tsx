import Image from "next/image";
import Link from "next/link";

const ProfileButton = async({ session }: { session: any; }) => {

    if (!session) {
        return <></>;
    }

    return (
        <Link 
            href="/profile"
            className="bg-info/30 hover:bg-info/70 transition-all px-5 rounded-lg py-2 flex gap-3">
            <Image 
                className="rounded-full"
                src={session.user.image}
                width={24}
                height={24}
                alt=""/>
            My Profile
        </Link>
    )
}

export default ProfileButton;