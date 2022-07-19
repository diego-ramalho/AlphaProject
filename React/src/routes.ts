// lang config
import appLang from './lang/resources.json';

// pages
import Taraturas from "./pages/Taraturas";
import PisosVacios from "./pages/PisosVacios";
import PisosInvestigados from "./pages/PisosInvestigados";
import PisosVendidos from "./pages/PisosVendidos";
import PisosAlquilados from "./pages/PisosAlquilados";
import Noticias from "./pages/Noticias";
import Encargos from "./pages/Encargos";

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

export const routes: Array<Route> = [
    {
        key: 'taraturas-route',
        title: appLang.pt.menu.main['item-01'][0],
        path: '/AlphaProject/taraturas',
        enabled: true,
        component: Taraturas,
        color: appLang.pt.menu.main['item-01'][1]
    },
    {
        key: 'pisos-vacios-route',
        title: appLang.pt.menu.main['item-02'][0],
        path: '/AlphaProject/pisosvacios',
        enabled: true,
        component: PisosVacios,
        color: appLang.pt.menu.main['item-02'][1]
    },
    {
        key: 'pisos-investigados-route',
        title: appLang.pt.menu.main['item-03'][0],
        path: '/AlphaProject/pisosinvestigados',
        enabled: true,
        component: PisosInvestigados,
        color: appLang.pt.menu.main['item-03'][1]
    },
    {
        key: 'noticias-route2',
        title: appLang.pt.menu.main['item-04'][0],
        path: '/AlphaProject/noticias',
        enabled: true,
        component: Noticias,
        color: appLang.pt.menu.main['item-04'][1]
    },
    {
        key: 'encargos-route3',
        title: appLang.pt.menu.main['item-05'][0],
        path: '/AlphaProject/encargos',
        enabled: true,
        component: Encargos,
        color: appLang.pt.menu.main['item-05'][1]
    },
    {
        key: 'pisos-vendidos-route4',
        title: appLang.pt.menu.main['item-06'][0],
        path: '/AlphaProject/pisosvendidos',
        enabled: true,
        component: PisosVendidos,
        color: appLang.pt.menu.main['item-06'][1]
    },
    {
        key: 'pisos-alquilados-route5',
        title: appLang.pt.menu.main['item-07'][0],
        path: '/AlphaProject/pisosalquilados',
        enabled: true,
        component: PisosAlquilados,
        color: appLang.pt.menu.main['item-07'][1]
    }
]