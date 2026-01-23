import { ArrowRightEndOnRectangleIcon, HomeIcon, QueueListIcon, UsersIcon } from "@heroicons/react/24/outline";

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
        title: "Leaderboards",
        url: "/leaderboards",
        icon: <QueueListIcon height={20}/>
    },
    {
        title: "Club Rules",
        url: "/guidelines",
        icon: <QueueListIcon height={20}/>
    },
    {
        title: "Join the Crew",
        url: "/join",
        icon: <ArrowRightEndOnRectangleIcon height={20}/>
    }
];