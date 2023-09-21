import * as React from "react";
import {
  Route,
  Routes,
  BrowserRouter,
  useNavigate,
  useLocation,
} from "react-router-dom";
import {
  HOME_ROUTE,
  LOGIN_ROUTE,
  REGISTER_ROUTE,
} from "../constants/appRoutes";
import { LoginPage } from "../pages/Authentication/Login/Login";
import { SignupPage } from "../pages/Authentication/Signup/Signup";
import { HomePage } from "../pages/Home/Home";
import { RouterHistory } from "../utils/RouterHistory";
import { RequiresAuth } from "./routeHelpers/RequiresAuth";
import { RequiresNoAuth } from "./routeHelpers/RequiresNoAuth";

export function AppRouter() {
  const GlobalRouterProvider = () => {
    const navigate = useNavigate();
    const location = useLocation();

    React.useEffect(() => {
      new RouterHistory().init(navigate, location);
    }, [navigate, location]);

    return <></>;
  };

  return (
    <BrowserRouter>
      <GlobalRouterProvider />
      <Routes>
        <Route path={LOGIN_ROUTE} Component={RequiresNoAuth(LoginPage)} />
        <Route path={REGISTER_ROUTE} Component={RequiresNoAuth(SignupPage)} />
        <Route path={HOME_ROUTE} Component={RequiresAuth(HomePage)} />
      </Routes>
    </BrowserRouter>
  );
}
