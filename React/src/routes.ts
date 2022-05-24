// lang config
import appLang from './lang/resources.json';

// pages
import Home from "./pages/Home";
import About from "./pages/About";
import Products from "./pages/Products";
import Users from "./pages/Users";

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
        key: 'home-route',
        title: appLang.pt.menu.main['item-01'][0],
        path: '/AlphaProject/home',
        enabled: true,
        component: Home,
        color: appLang.pt.menu.main['item-01'][1]
    },
    {
        key: 'about-route',
        title: appLang.pt.menu.main['item-02'][0],
        path: '/AlphaProject/about',
        enabled: true,
        component: About,
        color: appLang.pt.menu.main['item-02'][1]
    },
    {
        key: 'products-route',
        title: appLang.pt.menu.main['item-03'][0],
        path: '/AlphaProject/products',
        enabled: true,
        component: Products,
        color: appLang.pt.menu.main['item-03'][1]
    },
    {
        key: 'users-route',
        title: appLang.pt.menu.main['item-04'][0],
        path: '/AlphaProject/users',
        enabled: true,
        component: Users,
        color: appLang.pt.menu.main['item-04'][1]
    },
    {
        key: 'users-route',
        title: appLang.pt.menu.main['item-05'][0],
        path: '/AlphaProject/users',
        enabled: true,
        component: Users,
        color: appLang.pt.menu.main['item-05'][1]
    },
    {
        key: 'users-route',
        title: appLang.pt.menu.main['item-06'][0],
        path: '/AlphaProject/users',
        enabled: true,
        component: Users,
        color: appLang.pt.menu.main['item-06'][1]
    },
    {
        key: 'users-route',
        title: appLang.pt.menu.main['item-07'][0],
        path: '/AlphaProject/users',
        enabled: true,
        component: Users,
        color: appLang.pt.menu.main['item-07'][1]
    }
]