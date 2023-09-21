import * as React from "react";

import { Card, Typography, Space, Input, Button } from "antd";
import { Layout } from "../../components/Layout/Layout";

import Styles from "./Home.module.css";
import { AppManager } from "../../manager";

export function HomePage() {
  const [name, setName] = React.useState("");

  const handleProfileUpdate = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    AppManager.auth.updateUser(name, (errMsg, data) => {
      if (errMsg) {
        AppManager.alert.error("Update Failed", errMsg);
      }
    });
  };

  return (
    <Layout className={Styles.container}>
      <Card>
        <Typography.Title level={3}>Update Profile</Typography.Title>
        <Typography>Fill the details to update User.</Typography>
        <form className={Styles.form} onSubmit={handleProfileUpdate}>
          <Space direction="vertical">
            <Input
              size="large"
              placeholder="Display Name"
              className={Styles.input}
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <Button
              htmlType="submit"
              type="primary"
              size="large"
              className={Styles.button}
            >
              Update User
            </Button>
          </Space>
        </form>
      </Card>
    </Layout>
  );
}
