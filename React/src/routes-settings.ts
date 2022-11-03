// lang config
import appLang from './lang/resources.json';

// pages
import Profile from "./pages/settings/Profile";
import Logout from "./pages//settings/Logout";
import AdminRegisters from "./pages/admin/Registers";

// other
import { FC } from "react";

// interface
// interface Route {
//     key: string,
//     title: string,
//     path: string,
//     enabled: boolean,
//     component: FC<{}>
// }

export const routes_settings = [
    {
        key: 'profile-route-1',
        title: appLang.pt.menu.settings['item-01'],
        path: '/profile',
        enabled: true,
        component: Profile
    },
    {
        key: 'logout-route-2',
        title: appLang.pt.menu.settings['item-02'],
        path: '/logout',
        enabled: true,
        component: Logout
    }
    // {
    //     key: 'admin-records-route-2',
    //     title: appLang.pt.menu.admin['item-02'],
    //     path: '/Admin/Registers',
    //     enabled: true,
    //     component: AdminRegisters
    // }
]