import { CarIcon } from "@/components/icons/CarIcon";
import { ArrowRightEndOnRectangleIcon, CalendarDateRangeIcon, HomeIcon, QueueListIcon, UsersIcon } from "@heroicons/react/24/outline";

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
        title: "Leaders",
        url: "/leaderboards",
        icon: <QueueListIcon height={20}/>
    },
    {
        title: "Cars List",
        url: "/cars",
        icon: <CarIcon height={20} strokeWidth={1.5}/>
    },
     {
        title: "Events",
        url: "/events",
        icon: <CalendarDateRangeIcon height={20}/>
    },
    {
        title: "Join the Crew",
        url: "/join",
        icon: <ArrowRightEndOnRectangleIcon height={20}/>,
        class: "text-info"
    }
];