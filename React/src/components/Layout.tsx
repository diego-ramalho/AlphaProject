import React, { FC, ReactNode } from "react";
import {
  CssBaseline,
  Box,
  Link,
  Container,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from "@mui/material";
import "./Style.scss";
import Navbar from "./Navbar";
import ResponsiveAppBar from "./NavbarNew";
import Footer from "./Footer";
import { routes_sidebar } from "../routes-sidebar";
import { NavLink } from "react-router-dom";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { solid, regular, brands } from '@fortawesome/fontawesome-svg-core/import.macro' // <-- import st

import * as Icon from 'react-bootstrap-icons';
import { BarChartLineFill } from "react-bootstrap-icons";

import LogoImage from "../assets/images/logo.png";
import LogoIcon from "../assets/images/logo_icon.png";


// lang config
import appLang from '../lang/resources.json';

interface LayoutProps {
  children: ReactNode;
}

const Layout: FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <CssBaseline />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
          minHeight: "100vh",
          maxWidth: "100vw",
          flexGrow: 1,
        }}
      >
        <div className="sidebar">
          {/* <div className="logo-details">
            <i className='bx bxl-c-plus-plus icon'></i>
            <div className="logo_name">CodingLab</div>
            <i className='bx bx-menu' id="btn" ></i>
          </div> */}
          <div className="logo-details">
            {/* <i className='bx bx-map'></i>
            <i className='bx bx-arch'></i> */}
            {/* <i><Icon.Building className='FontAwesomeIcon' /></i> */}
            <img className="LogoImage" src={LogoImage} alt="logo" />
            <img className="LogoIcon" src={LogoIcon} alt="logo" />
            {/* <div className="logo_name">{appLang.pt.page['page-logo-text']}</div> */}
          </div>
          <ul className="nav-list">
            {/* <li>
              <i className='bx bx-search' ></i>
              <input type="text"></input>
              <span className="tooltip">Search</span>
            </li> */}

            {routes_sidebar.map((page) => (
              <li>
                <Link
                  key={page.key}
                  component={NavLink}
                  to={page.path}
                  color="black"
                  underline="none"
                  variant="button"
                >
                  {/* <span className="links_name_short">{page.title.substring(0,1)}</span> */}
                  {/* <span className={`links_name_short ${page.color}`}>●</span>*/}
                  {/* <i className={`bx bx-layer ${page.color}`}></i> */}
                  {/* <FontAwesomeIcon className='FontAwesomeIcon' icon={solid('building-user')} /> <BarChartLineFill /> */}
                  <i><Icon.LayersHalf className='FontAwesomeIcon' /><span className="links_name_short">{page.title.substring(page.title.length - 2, page.title.length)}</span></i>
                  <span className="links_name">{page.title}</span>
                </Link>
                <span className="tooltip">{page.title}</span>
              </li>
            ))}

            {/* <li>
              <a href="#">
                <i className='bx bx-grid-alt'></i>
                <span className="links_name">Dashboard</span>
              </a>
              <span className="tooltip">Dashboard</span>
            </li>
            <li>
              <a href="/Users">
                <i className='bx bx-user' ></i>
                <span className="links_name">User</span>
              </a>
              <span className="tooltip">User</span>
            </li>
            <li>
              <a href="#">
                <i className='bx bx-chat' ></i>
                <span className="links_name">Messages</span>
              </a>
              <span className="tooltip">Messages</span>
            </li>
            <li>
              <a href="#">
                <i className='bx bx-pie-chart-alt-2' ></i>
                <span className="links_name">Analytics</span>
              </a>
              <span className="tooltip">Analytics</span>
            </li>
            <li>
              <a href="#">
                <i className='bx bx-folder' ></i>
                <span className="links_name">File Manager</span>
              </a>
              <span className="tooltip">Files</span>
            </li>
            <li>
              <a href="#">
                <i className='bx bx-cart-alt' ></i>
                <span className="links_name">Order</span>
              </a>
              <span className="tooltip">Order</span>
            </li>
            <li>
              <a href="#">
                <i className='bx bx-heart' ></i>
                <span className="links_name">Saved</span>
              </a>
              <span className="tooltip">Saved</span>
            </li>
            <li>
              <a href="#">
                <i className='bx bx-cog' ></i>
                <span className="links_name">Setting</span>
              </a>
              <span className="tooltip">Setting</span>
            </li>
            <li className="profile">
              <div className="profile-details">
                <img src="profile.jpg" alt="profileImg" />
                <div className="name_job">
                  <div className="name">Prem Shahi</div>
                  <div className="job">Web designer</div>
                </div>
              </div>
              <i className='bx bx-log-out' id="log_out" ></i>
            </li> */}
          </ul>
        </div>
        <div className="content-box">
          <ResponsiveAppBar />
          <div className="content-box-children">{children}</div>
          {/* <Footer /> */}
        </div>
      </Box>
    </>
  );
};

export default Layout;