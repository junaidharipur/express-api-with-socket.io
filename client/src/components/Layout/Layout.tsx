import * as React from "react";

import { Layout as AntLayout, Space, Typography } from "antd";
import { Link } from "react-router-dom";
import {
  HOME_ROUTE,
  LOGIN_ROUTE,
  REGISTER_ROUTE,
} from "../../constants/appRoutes";
import { AppManager } from "../../manager";
import { TLoginData } from "../../models/Auth/Auth";

const { Header, Content } = AntLayout;

interface LayoutProps {
  children: React.ReactNode;
  className?: string;
}

export function Layout(props: LayoutProps) {
  const [user, setUser] = React.useState<TLoginData | undefined>(undefined);

  React.useEffect(() => {
    AppManager.auth.getUser((err, user) => {
      if (!err) {
        setUser(user);
      }
    });
  }, []);

  const handleLogout = () => {
    AppManager.auth.logoutUser((err) => {
      if (!err) {
        AppManager.route.goToLogin();
      }
    });
  };

  const { children, className } = props;

  return (
    <div>
      <Header style={{ display: "flex", justifyContent: "space-between" }}>
        <Space size="large">
          {user && (
            <Link style={{ color: "#fff" }} to={HOME_ROUTE}>
              Home
            </Link>
          )}
          {!user && (
            <>
              <Link style={{ color: "#fff" }} to={LOGIN_ROUTE}>
                Login
              </Link>
              <Link style={{ color: "#fff" }} to={REGISTER_ROUTE}>
                Sign Up
              </Link>
            </>
          )}
        </Space>
        <Space size="large">
          {user && (
            <Typography style={{ color: "#fff" }}>
              Hello, "{(user as any)?.name}""
            </Typography>
          )}
          <Typography
            onClick={handleLogout}
            style={{ color: "#fff", cursor: "pointer" }}
          >
            Logout
          </Typography>
        </Space>
      </Header>
      <Content className={className}>{children}</Content>
    </div>
  );
}
