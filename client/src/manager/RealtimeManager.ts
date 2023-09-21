import SocketIO, { Socket } from "socket.io-client";
import { TUserUpdate } from "../models/User/User";
import { BASE_URL } from "../constants/apiEndpoints";
import { AppManager } from ".";

type NetworkData<T> = { data: T };

export type IOEventTypes = {
  USER_UPDATED: NetworkData<TUserUpdate>;
};

type TEvents = keyof IOEventTypes;

const ALL_EVENTS: TEvents[] = ["USER_UPDATED"];

type InitConfig = {
  onDataReceived: <K extends keyof IOEventTypes>(
    evt: K,
    data: IOEventTypes[K]
  ) => void;
};

export class RealtimeManager {
  socket?: Socket;
  isInitialized = false;

  private config?: InitConfig;
  private areListenersRegistered = false;

  init(config: InitConfig) {
    this.isInitialized = true;
    this.config = config;

    if (this.socket && this.socket.connected) {
      this.destroy();
    }
    this.socket = SocketIO(BASE_URL, {
      transports: ["websocket"],
      reconnection: true,
      query: {
        token: AppManager.user.getAccessToken(),
      },
    });

    this.socket.on("connect_error", (reason) => {
      console.log("[ CONNECT_ERROR ]", reason);
    });

    this.socket.on("disconnect", () => {
      console.log("[ DIS_CONNECTED ]!");
    });

    this.socket.on("connect", () => {
      console.log("[ CONNECTED ]");

      this.initListeners();
    });
  }

  private initListeners() {
    if (this.areListenersRegistered) return;

    ALL_EVENTS.forEach((event) => {
      console.log(`[ REGISTER ] ${event}`);

      this.socket?.on(event, (data) => {
        this.config?.onDataReceived(event, data);
      });
    });
  }

  destroy() {
    if (!this.socket?.disconnected) {
      this.areListenersRegistered = false;
      this.socket?.disconnect();
      this.isInitialized = false;
    }
  }
}
