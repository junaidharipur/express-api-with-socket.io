import { TLoginData, TUserUpdateData } from "../models/Auth/Auth";
import { QueryResultCallback } from "../models/Callback/Callback";
import { APIManager } from "./APIManager";

type TAuthConfig = {
  postLoginFn: () => void;
  postLogoutFn: () => void;
};

export class AuthManager {
  private postLoginFn: () => void;
  private postLogoutFn: () => void;

  constructor(config: TAuthConfig) {
    this.postLoginFn = config.postLoginFn;
    this.postLogoutFn = config.postLogoutFn;
  }

  async loginUser(
    email: string,
    password: string,
    cb: QueryResultCallback<TLoginData>
  ) {
    const result = await APIManager.post(APIManager.LOGIN_API, {
      email,
      password,
    });

    if (result.status !== "error" && result.data) {
      localStorage.setItem("token", result?.data.access_token!);
      localStorage.setItem("user", JSON.stringify(result?.data.userData!));

      this.postLoginFn();

      return cb(null, result.data);
    } else {
      cb((result as any).message);
    }
  }

  async createNewUser(
    name: string,
    email: string,
    password: string,
    cb: QueryResultCallback<TLoginData>
  ) {
    const result = await APIManager.post(APIManager.SIGNUP_API, {
      name,
      email,
      password,
    });

    if (result.status !== "error" && result.data) {
      localStorage.setItem("token", result?.data.access_token);
      localStorage.setItem("user", JSON.stringify(result?.data.userData!));

      return cb(null, result.data);
    } else {
      cb((result as any).message);
    }
  }

  async updateUser(name: string, cb: QueryResultCallback<TUserUpdateData>) {
    const result = await APIManager.post(APIManager.PROFILE_API, {
      name,
    });

    if (result.status !== "error" && result.data) {
      return cb(null, result.data);
    } else {
      cb((result as any).message);
    }
  }

  logoutUser(cb: QueryResultCallback<TLoginData>) {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    this.postLogoutFn();

    cb(null);
  }
}
