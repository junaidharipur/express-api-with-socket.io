import React from "react";
import { AppManager } from "../../manager";
import { Spinner } from "../../components/Spinner/Spinner";

export function RequiresAuth(Component: React.FunctionComponent) {
  return function WithAuthCheck(props: any) {
    const [isAuthenticated, setIsAuthenticated] = React.useState(false);

    React.useEffect(() => {
      const token = localStorage.getItem("token");
      if (!token && !token?.length) {
        AppManager.route.goToLogin();
      }

      setIsAuthenticated(true);
    }, []);

    return isAuthenticated ? <Component {...props} /> : <Spinner />;
  };
}
