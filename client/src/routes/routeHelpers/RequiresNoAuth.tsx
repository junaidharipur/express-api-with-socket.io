import React from "react";
import { AppManager } from "../../manager";
import { Spinner } from "../../components/Spinner/Spinner";

export function RequiresNoAuth(Component: React.FunctionComponent) {
  return function WithNoAuthCheck(props: any) {
    const [isAuthenticated, setIsAuthenticated] = React.useState(false);

    React.useEffect(() => {
      const token = localStorage.getItem("token");
      if (token && token?.length) {
        AppManager.route.goToHome();
      }

      setIsAuthenticated(true);
    }, []);

    return isAuthenticated ? <Component {...props} /> : <Spinner />;
  };
}
