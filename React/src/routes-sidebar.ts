// lang config
import appLang from './lang/resources.json';

// pages
import Zona01 from "./pages/zonas/Zona01";
import Zona02 from "./pages/zonas/Zona02";
import Zona03 from "./pages/zonas/Zona03";
import Zona04 from "./pages/zonas/Zona04";

// other
import { FC } from "react";

// interface
interface Route {
    key: string,
    title: string,
    path: string,
    enabled: boolean,
    component: FC<{}>,
    color: string
}

export const routes_sidebar: Array<Route> = [
    {
        key: 'zona01-route',
        title: appLang.pt.menu.sidebar['item-01'],
        path: '/zona01',
        enabled: true,
        component: Zona01,
        //color: 'default'
        color: 'yellow-zone'
    },
    {
        key: 'zona02-route',
        title: appLang.pt.menu.sidebar['item-02'],
        path: '/zona02',
        enabled: true,
        component: Zona02,
        //color: 'default'
        color: 'orange-zone'
    },
    {
        key: 'zona03-route',
        title: appLang.pt.menu.sidebar['item-03'],
        path: '/zona03',
        enabled: true,
        component: Zona03,
        //color: 'default'
        color: 'blue-zone'
    },
    {
        key: 'zona04-route',
        title: appLang.pt.menu.sidebar['item-04'],
        path: '/zona04',
        enabled: true,
        component: Zona04,
        //color: 'default'
        color: 'green-zone'
    }
]