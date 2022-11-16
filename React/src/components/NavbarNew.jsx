import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { Link } from 'react-router-dom';
import { routes as appRoutes } from "../routes";
import { routes_settings as appSettingsRoutes } from "../routes-settings";
import { routes_admin as appAdminRoutes } from "../routes-admin";
// lang config
import appLang from '../lang/resources.json';

import { useRecoilValue } from 'recoil';

import { authAtom } from '../_state';
import { render } from '@testing-library/react';

const ResponsiveAppBar = () =>
{
    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);

    const handleOpenNavMenu = (event) =>
    {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) =>
    {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () =>
    {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () =>
    {
        setAnchorElUser(null);
    };

    const auth = useRecoilValue(authAtom);


    const AnonymousSettingsMenu = () =>
    {
        return (
            <Link
                className='nav-link-mobile'
                key='user-login'
                to='/'
                onClick={handleCloseUserMenu}>
                <Typography textAlign="center">Acceso</Typography>
            </Link>


            // (!useRecoilValue(authAtom) ?
            //     <Link
            //         className='nav-link-mobile'
            //         key='user-login'
            //         to='/'
            //         onClick={handleCloseUserMenu}>
            //         <Typography textAlign="center">Acceso</Typography>
            //     </Link>
            //     : "")

            //     (useRecoilValue(authAtom) && appSettingsRoutes.map((setting) => (
            //         <Link
            //             className='nav-link-mobile'
            //             key={setting.key}
            //             to={setting.path}
            //             onClick={handleCloseUserMenu}>
            //             <Typography textAlign="center">{setting.title}</Typography>
            //         </Link>
            //     )))

            //     (useRecoilValue(authAtom) && appAdminRoutes.map((admin) => (
            //         <Link
            //             className='nav-link-mobile'
            //             key={admin.key}
            //             to={admin.path}
            //             onClick={handleCloseUserMenu}>
            //             <Typography textAlign="center">{admin.title}</Typography>
            //         </Link>
            //     )))
        )
    };

    const AnonymousNavMenu = () =>
    {
        return (
            <Link
                className={`main menu default`}
                key='user-login'
                to='/'
                onClick={handleCloseUserMenu}>
                <Typography textAlign="center">Acceso</Typography>
            </Link>
            // appRoutes.map((route) => (
            //     <Link
            //         className='nav-link-mobile'
            //         key={route.key}
            //         to={route.path}
            //         onClick={handleCloseNavMenu}><Typography textAlign="center">{route.title}</Typography></Link>
            // ))
        )
    };

    const AnonymousNavMobileMenu = () =>
    {
        return (
            <Link
                className='nav-link-mobile'
                key='user-login'
                to='/'
                onClick={handleCloseUserMenu}>
                <Typography textAlign="center">Acceso</Typography>
            </Link>
            // appRoutes.map((route) => (
            //     <Link
            //         className='nav-link-mobile'
            //         key={route.key}
            //         to={route.path}
            //         onClick={handleCloseNavMenu}><Typography textAlign="center">{route.title}</Typography></Link>
            // ))
        )
    };

    const UserNavMenu = () =>
    {
        return (
            appRoutes.map((route) => (
                <Link
                    className='nav-link-mobile'
                    key={route.key}
                    to={route.path}
                    onClick={handleCloseNavMenu}><Typography textAlign="center">{route.title}</Typography></Link>
            ))
        )
    };

    const UserNavMobileMenu = () =>
    {
        return (
            appRoutes.map((route) => (
                <Link
                    className={`main menu ${route.color}`}
                    key={route.key}
                    to={route.path}
                    onClick={handleCloseNavMenu}><Typography textAlign="center">{route.title}</Typography></Link>
            ))
        )
    };

    const UserSettingsMenu = () =>
    {
        return (
            <React.Fragment>
                {appSettingsRoutes.map((setting) => (
                    <Link
                        className='nav-link-mobile'
                        key={setting.key}
                        to={setting.path}
                        onClick={handleCloseUserMenu}>
                        <Typography textAlign="center">{setting.title}</Typography>
                    </Link>
                ))}
            </React.Fragment>
        )
    };

    const AdminNavMenu = () =>
    {
        return (
            appRoutes.map((route) => (
                <Link
                    className={`main menu default`}
                    key={route.key}
                    to={route.path}
                    onClick={handleCloseNavMenu}><Typography textAlign="center">{route.title}</Typography></Link>
            ))
        )
    };

    const AdminNavMobileMenu = () =>
    {
        return (
            appRoutes.map((route) => (
                <Link exact={route.path}
                    className={`main menu ${route.color}`}
                    key={route.key}
                    to={route.path}
                    onClick={handleCloseNavMenu}><Typography textAlign="center">{route.title}</Typography></Link>
            ))
        )
    };

    const AdminSettingsMenu = () =>
    {
        return (
            <React.Fragment>
                {appSettingsRoutes.map((setting) => (
                    <Link
                        className='nav-link-mobile'
                        key={setting.key}
                        to={setting.path}
                        onClick={handleCloseUserMenu}>
                        <Typography textAlign="center">{setting.title}</Typography>
                    </Link>
                ))}

                {appAdminRoutes.map((admin) => (
                    <Link
                        className='nav-link-mobile'
                        key={admin.key}
                        to={admin.path}
                        onClick={handleCloseUserMenu}>
                        <Typography textAlign="center">{admin.title}</Typography>
                    </Link>
                ))}
            </React.Fragment>
        )
    };

    return (
        <AppBar position="static">
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{
                                display: { xs: 'block', md: 'none' },
                            }}
                        >

                            {!auth ? <AnonymousNavMenu /> : (auth?.roleId === 1 ? <AdminNavMenu /> : <UserNavMenu />)}

                        </Menu>
                    </Box>
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                        {/* {appRoutes.map((route) => (
                            <Link
                                className={`main menu ${route.color}`}
                                key={route.key}
                                to={route.path}>{route.title}</Link>
                        ))} */}

                        {!auth ? <AnonymousNavMobileMenu /> : (auth?.roleId === 1 ? <AdminNavMobileMenu /> : <UserNavMobileMenu />)}
                    </Box>

                    <Box sx={{ flexGrow: 0 }}>
                        <Tooltip title="">
                            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                <Avatar alt={auth?.name} />
                            </IconButton>
                        </Tooltip>
                        <Menu
                            sx={{ mt: '45px' }}
                            id="menu-appbar"
                            anchorEl={anchorElUser}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={Boolean(anchorElUser)}
                            onClose={handleCloseUserMenu}
                        >

                            {!auth ? <AnonymousSettingsMenu /> : (auth?.roleId === 1 ? <AdminSettingsMenu /> : <UserSettingsMenu />)}

                        </Menu>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
};
export default ResponsiveAppBar;
