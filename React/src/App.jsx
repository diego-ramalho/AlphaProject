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
import Recover from "./pages/Recover";
import Profile from "./pages/settings/Profile";
import Logout from "./pages//settings/Logout";

import { Nav, Alert, PrivateRoute } from './_components';

import { history } from './_helpers';

import Loading from './components/atoms/Loading';

import { useRecoilValue } from 'recoil';

import { authAtom } from './_state';

// pages
// import AdminUsers from "./pages/admin/Users";
// import AdminRegisters from "./pages/admin/Registers";
// import AdminRegions from "./pages/admin/Regions";
// import AdminFilters from "./pages/admin/Filters";

import { UsersList } from './pages/admin/UsersList';
import { UsersAddEdit } from './pages/admin/UsersAddEdit';

import { FiltersList } from './pages/admin/FiltersList';
import { FiltersAddEdit } from './pages/admin/FiltersAddEdit';

import { ZonesList } from './pages/admin/ZonesList';
import { ZonesAddEdit } from './pages/admin/ZonesAddEdit';

import { NewsList } from './pages/admin/NewsList';
import { NewsAddEdit } from './pages/admin/NewsAddEdit';

import { ChargesList } from './pages/admin/ChargesList';
import { ChargesAddEdit } from './pages/admin/ChargesAddEdit';

import { RegistersList } from './pages/admin/RegistersList';
import { RegistersAddEdit } from './pages/admin/RegistersAddEdit';
import { TaraturasView } from './pages/TaraturasView';
import { EncargosView } from './pages/EncargosView';
import { NoticiasView } from './pages/NoticiasView';


const login_page = [
  {
    key: 'login-route',
    title: 'Login',
    path: '/',
    enabled: true,
    component: Login
  },
  {
    key: 'recover-route',
    title: 'Recover',
    path: '/Recover',
    enabled: true,
    component: Recover
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
        {/* {auth && <Redirect to={{ pathname: '/' }} />} */}

        {/* <Route path='/Admin/UsersList' element={<UsersList />} /> */}

        <Route exact path='/Admin/Users' element={<UsersList />} />
        <Route path='/Admin/Users/add' element={<UsersAddEdit />} />
        <Route path='/Admin/Users/edit/:id' element={<UsersAddEdit />} />

        <Route exact path='/Admin/Filters' element={<FiltersList />} />
        <Route path='/Admin/Filters/add' element={<FiltersAddEdit />} />
        <Route path='/Admin/Filters/edit/:id' element={<FiltersAddEdit />} />

        <Route exact path='/Admin/Zones' element={<ZonesList />} />
        <Route path='/Admin/Zones/add' element={<ZonesAddEdit />} />
        <Route path='/Admin/Zones/edit/:id' element={<ZonesAddEdit />} />

        <Route exact path='/Admin/News' element={<NewsList />} />
        <Route path='/Admin/News/add' element={<NewsAddEdit />} />
        <Route path='/Admin/News/edit/:id' element={<NewsAddEdit />} />

        <Route exact path='/Admin/Charges' element={<ChargesList />} />
        <Route path='/Admin/Charges/add' element={<ChargesAddEdit />} />
        <Route path='/Admin/Charges/edit/:id' element={<ChargesAddEdit />} />

        <Route exact path='/Admin/Registers' element={<RegistersList />} />
        <Route path='/Admin/Registers/add' element={<RegistersAddEdit />} />
        <Route path='/Admin/Registers/edit/:id' element={<RegistersAddEdit />} />
        {/* <Route path='/Admin/Registers/view/:id' element={<TaraturasView />} />
        <Route path='/TaraturasView/:id' element={<TaraturasView />} /> */}

        <Route path='/Registers/view/:id' element={<TaraturasView />} />
        <Route path='/Encargos/view/:id' element={<EncargosView />} />
        <Route path='/Noticias/view/:id' element={<NoticiasView />} />

        {/* <Route exact path='/Admin/Users' component={UsersList} />
        <Route path='/Admin/Users/add' component={UsersAddEdit} />
        <Route path='/Admin/Users/edit/:id' component={UsersAddEdit} /> */}

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


        {/* auth ? <Route exact path='/Admin/Users' element={<AdminUsers />} /> : '';
        auth ? <Route exact path='/Admin/Registers' element={<AdminRegisters />} /> : '';
        auth ? <Route exact path='/Admin/Regions' element={<AdminRegions />} /> : '';
        auth ? <Route exact path='/Admin/Filters' element={<AdminFilters />} /> : ''; */}

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

        {/* {appSettingsRoutes.map((route) => (
          <Route
            key={route.key}
            path={route.path}
            element={<route.component />}
          />
        ))} */}

        <Route exact path='/Profile' element={<Profile />} />
        <Route path="*" element={<Navigate to="/Profile" />} />

        <Route exact path='/Logout' element={<Logout />} />

        <Route path='/Registers/view/:id' element={<TaraturasView />} />

        <Route exact path='/Admin/Registers' element={<RegistersList />} />
        <Route path='/Admin/Registers/add' element={<RegistersAddEdit />} />
        <Route path='/Admin/Registers/edit/:id' element={<RegistersAddEdit />} />

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
        <Route path="*" element={<Navigate to="/" />} />
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