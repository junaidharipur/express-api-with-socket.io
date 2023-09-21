import * as React from "react";

import Styles from "./Signup.module.css";

import { Card, Typography, Input, Space, Button } from "antd";

import { Layout } from "../../../components/Layout/Layout";
import { AppManager } from "../../../manager";

export function SignupPage() {
  const [email, setEmail] = React.useState("");
  const [pass, setPass] = React.useState("");
  const [name, setName] = React.useState("");

  const handleSignup = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    AppManager.auth.createNewUser(name, email, pass, (errMsg, data) => {
      if (errMsg) {
        AppManager.alert.error("Signup Failed", errMsg);
      }

      if (data) {
        AppManager.route.goToHome();
      }
    });
  };

  return (
    <Layout className={Styles.container}>
      <Card>
        <Typography.Title level={2}>Register</Typography.Title>
        <Typography>Please full out the form to register.</Typography>
        <form className={Styles.form} onSubmit={handleSignup}>
          <Space direction="vertical">
            <Input
              size="large"
              placeholder="Display Name"
              className={Styles.input}
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <Input
              size="large"
              placeholder="Email Address"
              className={Styles.input}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input.Password
              size="large"
              placeholder="Password"
              className={Styles.input}
              value={pass}
              onChange={(e) => setPass(e.target.value)}
            />
            <Button
              htmlType="submit"
              type="primary"
              size="large"
              className={Styles.button}
            >
              Sign up
            </Button>
          </Space>
        </form>
      </Card>
    </Layout>
  );
}
