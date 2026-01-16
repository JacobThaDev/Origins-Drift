import { ArrowRightEndOnRectangleIcon, HomeIcon, UsersIcon } from "@heroicons/react/24/outline";

export default [
    {
        title: "Home",
        url: "/",
        icon: <HomeIcon height={20}/>
    },
    {
        title: "Members",
        url: "/members",
        icon: <UsersIcon height={20}/>
    },
    {
        title: "Join ODC",
        url: "/join",
        icon: <ArrowRightEndOnRectangleIcon height={20}/>
    }
];