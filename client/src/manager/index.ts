import { AlertManager } from "./AlertManager";
import { AppStateSyncManager } from "./AppStateSyncManager";
import { AuthManager } from "./AuthManager";
import { RealtimeManager } from "./RealtimeManager";
import { RouteManager } from "./RouteManager";
import { UserManager } from "./UserManager/UserManager";

export class AppManager {
  static realtime = new RealtimeManager();

  static auth = new AuthManager({
    postLoginFn: AppManager.postLoginHook,
    postLogoutFn: AppManager.postLogoutHook,
  });

  static user = new UserManager();
  static sync = AppStateSyncManager;
  static route = RouteManager;
  static alert = AlertManager;

  private static postLoginHook() {
    AppManager.realtime.init({
      onDataReceived(evt, data) {
        AppStateSyncManager.networkDataReceived(evt, data);
      },
    });
  }

  private static postLogoutHook() {
    AppManager.realtime.destroy();
  }
}
