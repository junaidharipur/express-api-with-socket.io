import { NavigateFunction, Location } from "react-router-dom";

export class RouterHistory {
  private static _navigate: NavigateFunction;
  private static _location: Location;

  init(navigate: NavigateFunction, location: Location) {
    RouterHistory._navigate = navigate;
    RouterHistory._location = location;
  }

  static goTo(path: string) {
    RouterHistory._navigate(path);
  }

  get location() {
    return RouterHistory._location;
  }
}
