export abstract class AppManager {
  protected isSystemBusEnabled = true;

  setSystemBusEnabled(state: boolean) {
    this.isSystemBusEnabled = state;

    return this;
  }
}
