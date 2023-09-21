import { AppManager } from "..";
import { IOEventTypes } from "../RealtimeManager";

export class UserNetworkHelper {
  static onNetworkDataReceived<
    E extends keyof IOEventTypes,
    T extends IOEventTypes[E]
  >(event: E, data: T) {
    switch (event) {
      case "USER_UPDATED":
        AppManager.user.updateUserInfo(data.data);
        AppManager.alert.success("Success", "User Updated Successfully!");
        break;
    }
  }
}
