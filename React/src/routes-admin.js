// lang config
import appLang from './lang/resources.json';

// pages
import AdminUsers from "./pages/admin/Users";
import AdminRegisters from "./pages/admin/Registers";
import AdminZones from "./pages/admin/Zones";
import AdminFilters from "./pages/admin/Filters";

import { PrivateRoute } from './_components';

// other
import { FC } from "react";

// interface
// interface PrivateRoute {
//     key: string,
//     title: string,
//     path: string,
//     enabled: boolean,
//     component: FC<{}>
// }

export const routes_admin = [
    {
        key: 'admin-users-route-1',
        title: appLang.pt.menu.admin['item-01'],
        path: '/AlphaProject/Admin/Users',
        enabled: true,
        component: AdminUsers
    },
    {
        key: 'admin-records-route-2',
        title: appLang.pt.menu.admin['item-02'],
        path: '/AlphaProject/Admin/Registers',
        enabled: true,
        component: AdminRegisters
    },
    {
        key: 'admin-records-route-3',
        title: appLang.pt.menu.admin['item-03'],
        path: '/AlphaProject/Admin/Zones',
        enabled: true,
        component: AdminZones
    },
    {
        key: 'admin-records-route-4',
        title: appLang.pt.menu.admin['item-04'],
        path: '/AlphaProject/Admin/Filters',
        enabled: true,
        component: AdminFilters
    }
]