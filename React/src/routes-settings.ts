// pages
import Profile from "./pages/settings/Profile";
import Logout from "./pages//settings/Logout";

// other
import { FC } from "react";

// interface
interface Route {
    key: string,
    title: string,
    path: string,
    enabled: boolean,
    component: FC<{}>
}

export const routes_settings: Array<Route> = [
    {
        key: 'profile-route',
        title: 'Profile',
        path: '/profile',
        enabled: true,
        component: Profile
    },
    {
        key: 'logout-route',
        title: 'Logout',
        path: '/logout',
        enabled: true,
        component: Logout
    }
]