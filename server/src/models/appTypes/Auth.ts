import { UserDoc } from "../db/User/User";

export type UserAuthCredentials = {
  email: string;
  password: string;
};

export type UserLoginData = {
  access_token: string;
  expires_in: number | undefined;
  userData: Omit<UserDoc, "password">;
};
