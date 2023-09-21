import React, { FormEvent } from "react";

import Styles from "./Login.module.css";

import { Card, Typography, Input, Space, Button } from "antd";

import { Layout } from "../../../components/Layout/Layout";
import { AppManager } from "../../../manager";

export function LoginPage() {
  const [email, setEmail] = React.useState("");
  const [pass, setPass] = React.useState("");

  const loginHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    AppManager.auth.loginUser(email, pass, (errMsg, data) => {
      if (errMsg) {
        AppManager.alert.error("Login Failed", errMsg);
      }

      if (data) {
        AppManager.route.goToHome();
      }
    });
  };

  return (
    <Layout className={Styles.container}>
      <Card>
        <Typography.Title level={2}>Login</Typography.Title>
        <Typography>Please full out the form to login.</Typography>
        <form className={Styles.form} onSubmit={loginHandler}>
          <Space direction="vertical">
            <Input
              size="large"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email Address"
              className={Styles.input}
            />
            <Input.Password
              size="large"
              value={pass}
              onChange={(e) => setPass(e.target.value)}
              placeholder="Password"
              className={Styles.input}
            />
            <Button
              htmlType="submit"
              type="primary"
              size="large"
              className={Styles.button}
            >
              Login
            </Button>
          </Space>
        </form>
      </Card>
    </Layout>
  );
}
