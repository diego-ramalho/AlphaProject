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
    component: FC<{}>
}

export const routes: Array<Route> = [
    {
        key: 'home-route',
        title: 'Home',
        path: '/AlphaProject/home',
        enabled: true,
        component: Home
    },
    {
        key: 'about-route',
        title: 'About',
        path: '/AlphaProject/about',
        enabled: true,
        component: About
    },
    {
        key: 'products-route',
        title: 'Products',
        path: '/AlphaProject/products',
        enabled: true,
        component: Products
    },
    {
        key: 'users-route',
        title: 'Users',
        path: '/AlphaProject/users',
        enabled: true,
        component: Users
    }
]