import React, { FC, ReactNode, useEffect, useState } from "react";
import
{
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


import { useZoneActions } from '../_actions';

// lang config
import appLang from '../lang/resources.json';

const Layout = ({ children }) =>
{

  const zoneActions = useZoneActions();
  const [zoneoptions, setZoneOptions] = useState([]);

  useEffect(() =>
  {
    zoneActions.getAll().then(x => setZoneOptions(x));
  }, []);

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
          <div className="logo-details">
            <img className="LogoImage" src={LogoImage} alt="logo" />
            <img className="LogoIcon" src={LogoIcon} alt="logo" />
          </div>
          <ul className="nav-list">

            {zoneoptions.map(option => (
              <li>
                <Link
                  id={option.id}
                  key={"zone" + option.id + "route"}
                  to="#"
                  color="black"
                  underline="none"
                  variant="button"
                  onClick={(e) => alert(option.id)}
                >
                  <i><Icon.LayersHalf className='FontAwesomeIcon' /><span className="links_name_short">"A"</span></i>
                  <span className="links_name">{option.zoneName}</span>
                </Link>
                <span className="tooltip">{option.zoneName}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="content-box">
          <ResponsiveAppBar />
          <div className="content-box-children">{children}</div>
        </div>
      </Box>
    </>
  );
};

export default Layout;