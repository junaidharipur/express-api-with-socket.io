import { AlertManager } from "./AlertManager";
import { AuthManager } from "./AuthManager";
import { RouteManager } from "./RouteManager";

export class AppManager {
  static auth = new AuthManager();
  static route = RouteManager;
  static alert = AlertManager;
}
