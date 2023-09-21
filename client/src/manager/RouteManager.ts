import {
  HOME_ROUTE,
  LOGIN_ROUTE,
  REGISTER_ROUTE,
} from "../constants/appRoutes";
import { RouterHistory } from "../utils/RouterHistory";

export class RouteManager {
  static goToHome() {
    RouterHistory.goTo(HOME_ROUTE);
  }

  static goToLogin() {
    RouterHistory.goTo(LOGIN_ROUTE);
  }

  static goToSignup() {
    RouterHistory.goTo(REGISTER_ROUTE);
  }
}
