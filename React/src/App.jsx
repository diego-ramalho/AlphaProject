import React, { useEffect, useState } from 'react';
import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { routes as appRoutes } from "./routes";
import { routes_sidebar as appSidebarRoutes } from "./routes-sidebar";
import { routes_settings as appSettingsRoutes } from "./routes-settings";
import { routes_admin as appAdminRoutes } from "./routes-admin";
import Layout from "./components/Layout";
import Login from "./pages/Login";

import { Nav, Alert, PrivateRoute } from './_components';

import { history } from './_helpers';

import Loading from './components/atoms/Loading';

import { useRecoilValue } from 'recoil';

import { authAtom } from './_state';

// pages
import AdminUsers from "./pages/admin/Users";
import AdminRegisters from "./pages/admin/Registers";
import AdminRegions from "./pages/admin/Regions";
import AdminFilters from "./pages/admin/Filters";

import { UsersList } from './pages/admin/UsersList';
import { UsersAddEdit } from './pages/admin/UsersAddEdit';

import { FiltersList } from './pages/admin/FiltersList';
import { FiltersAddEdit } from './pages/admin/FiltersAddEdit';

import { ZonesList } from './pages/admin/ZonesList';
import { ZonesAddEdit } from './pages/admin/ZonesAddEdit';

import { RegistersList } from './pages/admin/RegistersList';
import { RegistersAddEdit } from './pages/admin/RegistersAddEdit';
import { TaraturasView } from './pages/TaraturasView';


const login_page = [
  {
    key: 'login-route',
    title: 'Login',
    path: '/AlphaProject/',
    enabled: true,
    component: Login
  }
]

function App()
{
  // define theme
  const theme = createTheme({
    palette: {
      primary: {
        light: "#63b8ff",
        main: "#FFF",
        dark: "#005db0",
        contrastText: "#000",
      },
      secondary: {
        main: "#FFF",
        light: "#82e9de",
        dark: "#00867d",
        contrastText: "#000",
      },
    },
  });

  const AdminRouter = () =>
  {
    return (
      <Routes>
        {/* {auth && <Redirect to={{ pathname: '/AlphaProject/' }} />} */}

        {/* <Route path='/AlphaProject/Admin/UsersList' element={<UsersList />} /> */}

        <Route exact path='/AlphaProject/Admin/Users' element={<UsersList />} />
        <Route path='/AlphaProject/Admin/Users/add' element={<UsersAddEdit />} />
        <Route path='/AlphaProject/Admin/Users/edit/:id' element={<UsersAddEdit />} />

        <Route exact path='/AlphaProject/Admin/Filters' element={<FiltersList />} />
        <Route path='/AlphaProject/Admin/Filters/add' element={<FiltersAddEdit />} />
        <Route path='/AlphaProject/Admin/Filters/edit/:id' element={<FiltersAddEdit />} />

        <Route exact path='/AlphaProject/Admin/Zones' element={<ZonesList />} />
        <Route path='/AlphaProject/Admin/Zones/add' element={<ZonesAddEdit />} />
        <Route path='/AlphaProject/Admin/Zones/edit/:id' element={<ZonesAddEdit />} />

        <Route exact path='/AlphaProject/Admin/Registers' element={<RegistersList />} />
        <Route path='/AlphaProject/Admin/Registers/add' element={<RegistersAddEdit />} />
        <Route path='/AlphaProject/Admin/Registers/edit/:id' element={<RegistersAddEdit />} />
        {/* <Route path='/AlphaProject/Admin/Registers/view/:id' element={<TaraturasView />} />
        <Route path='/AlphaProject/TaraturasView/:id' element={<TaraturasView />} /> */}
        <Route path='/AlphaProject/Registers/view/:id' element={<TaraturasView />} />

        {/* <Route exact path='/AlphaProject/Admin/Users' component={UsersList} />
        <Route path='/AlphaProject/Admin/Users/add' component={UsersAddEdit} />
        <Route path='/AlphaProject/Admin/Users/edit/:id' component={UsersAddEdit} /> */}

        {login_page.map((route) => (
          <Route
            key={route.key}
            path={route.path}
            element={<route.component />}
          />
        ))}

        {appRoutes.map((route) => (
          <Route
            key={route.key}
            path={route.path}
            element={<route.component />}
          />
        ))}

        {appSidebarRoutes.map((route) => (
          <Route
            key={route.key}
            path={route.path}
            element={<route.component />}
          />
        ))
        }

        {auth && appSettingsRoutes.map((route) => (
          <Route
            key={route.key}
            path={route.path}
            element={<route.component />}
          />
        ))}

        {/* {appAdminRoutes.map((route) => (
              <Route
                key={route.key}
                path={route.path}
                element={<PrivateRoute />}
              />
            ))} */}


        {/* auth ? <Route exact path='/AlphaProject/Admin/Users' element={<AdminUsers />} /> : '';
        auth ? <Route exact path='/AlphaProject/Admin/Registers' element={<AdminRegisters />} /> : '';
        auth ? <Route exact path='/AlphaProject/Admin/Regions' element={<AdminRegions />} /> : '';
        auth ? <Route exact path='/AlphaProject/Admin/Filters' element={<AdminFilters />} /> : ''; */}

      </Routes>
    )
  };

  const UserRouter = () =>
  {
    return (
      <Routes>
        {appRoutes.map((route) => (
          <Route
            key={route.key}
            path={route.path}
            element={<route.component />}
          />
        ))}

        {appSidebarRoutes.map((route) => (
          <Route
            key={route.key}
            path={route.path}
            element={<route.component />}
          />
        ))
        }

        {appSettingsRoutes.map((route) => (
          <Route
            key={route.key}
            path={route.path}
            element={<route.component />}
          />
        ))}
        <Route path="*" element={<Navigate to="/AlphaProject/Profile" />} />

        <Route path='/AlphaProject/Registers/view/:id' element={<TaraturasView />} />

      </Routes>
    )
  };

  const AnonymousRouter = () =>
  {
    return (
      <Routes>
        {login_page.map((route) => (
          <Route
            key={route.key}
            path={route.path}
            element={<route.component />}
          />
        ))}
        <Route path="*" element={<Navigate to="/AlphaProject/" />} />
      </Routes>
    )
  };


  const auth = useRecoilValue(authAtom);

  // const [loading, setLoading] = useState(true);

  // useEffect(() =>
  // {
  //   setTimeout(() => setLoading(false), 6000)
  // }, [])

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router location={history.location} navigator={history}>
        <Alert />
        <Layout>
          {!auth ? <AnonymousRouter /> : (auth?.roleId === 1 ? <AdminRouter /> : <UserRouter />)}
        </Layout>
      </Router>
    </ThemeProvider>
  );
}

export default App;