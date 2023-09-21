import { TLoginData } from "../../models/Auth/Auth";
import { TUserUpdate } from "../../models/User/User";
import { QueryResultCallback } from "../../models/Callback/Callback";
import { CUSTOM_USER_CHANGE_EVENT } from "../../constants/customDomEvents";
import { UserNetworkHelper } from "./NetworkHelper";

export class UserManager {
  networkHelper = UserNetworkHelper;

  updateUserInfo(data: TUserUpdate) {
    this.getUser((err, user) => {
      if (!err) {
        const newUser = { ...user, name: data.name };

        localStorage.setItem("user", JSON.stringify(newUser));
      }
    });

    var evt = new CustomEvent(CUSTOM_USER_CHANGE_EVENT, { detail: 1 });
    document.dispatchEvent(evt);
  }

  getUser(cb: QueryResultCallback<TLoginData>) {
    const user = localStorage.getItem("user");

    if (typeof user === "string" && user.length > 5) {
      cb(null, JSON.parse(user));
    }

    cb("Error Getting User!");
  }

  getAccessToken(): string {
    const token = localStorage.getItem("token");

    return token ?? "";
  }
}
