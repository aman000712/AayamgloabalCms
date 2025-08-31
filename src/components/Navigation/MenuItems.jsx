
import {
    FiAward, FiBookOpen, FiCalendar, FiChrome, FiClipboard,
    FiFileText, FiHome, FiImage, FiInfo, FiLink, FiUser,
    FiUserCheck, FiUserPlus, FiUsers, FiVoicemail
} from "react-icons/fi";

export const menuItems = [
    {
        name: "Home",
        path: "/",
        icon: <FiHome size={18} />
    },
    {
        name: "About",
        path: "/about",
        icon: <FiInfo
            size={18} />
    },
    {
        name: "Courses",
        path: "/courses",
        icon: <FiBookOpen size={18} />
    },
    {
        name: "Our Principle",
        path: "/our-principle",
        icon: <FiAward size={18} />
    },

    {
        name: "Our Faculty",
        path: "/our-faculty",
        icon: <FiUserCheck size={18} />
    },

    {
        name: "Gallery",
        path: "/gallery",

        icon: <FiImage size={18} />
    },
    {
        name: "Events",

        path: "/events",
        icon: <FiCalendar size={18} />
    },

    {
        name: "Blogs",
        path: "/blogs",
        icon: <FiFileText size={18} />
    },

    {
        name: "Team",
        path: "/team",
        icon: <FiChrome size={18} />
    },
    {
        name: "ContactUs",
        path: "/contactus",
        icon: <FiVoicemail size={18} />
    },
    {
        name: "UsefulLinks",
        path: "/usefullinks",
        icon: <FiLink size={18} />
    },
];
