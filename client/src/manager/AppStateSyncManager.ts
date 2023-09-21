import { AppManager } from ".";
import { IOEventTypes } from "./RealtimeManager";

export class AppStateSyncManager {
  static networkDataReceived<
    E extends keyof IOEventTypes,
    T extends IOEventTypes[E]
  >(event: E, data: T) {
    AppManager.user.networkHelper.onNetworkDataReceived(event, data);
  }
}
