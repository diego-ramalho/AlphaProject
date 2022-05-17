import React from "react";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { routes as appRoutes } from "./routes";
import { routes_sidebar as appSidebarRoutes } from "./routes-sidebar";
import { routes_settings as appSettingsRoutes } from "./routes-settings";
import Layout from "./components/Layout";
import Login from "./pages/Login";


const login_page = [
  {
    key: 'login-route',
    title: 'Login',
    path: '/AlphaProject/',
    enabled: true,
    component: Login
  }
]

function App() {
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

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Layout>
          <Routes>

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
            ))}

            {appSettingsRoutes.map((route) => (
              <Route
                key={route.key}
                path={route.path}
                element={<route.component />}
              />
            ))}
          </Routes>
        </Layout>
      </Router>
    </ThemeProvider>
  );
}

export default App;