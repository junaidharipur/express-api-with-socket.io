import { Types } from "mongoose";
import { EventBus } from "./EventBus/EventSystem";
import { EventTypes } from "./EventBus/EventTypes";
import { AppIOManager } from ".";

export class UserIOManager {
  static init = (() => {
    console.log(`[ USER I/O MANAGER ] Registering events...`);
    console.log(`[ EVENT ] USER_UPDATED subscribed!`);
    EventBus.subscribe("USER_UPDATED", UserIOManager.pipeUserToClient);
  })();

  private static pipeUserToClient(
    event: keyof EventTypes,
    user: EventTypes[keyof EventTypes],
    userId: Types.ObjectId,
    channels?: string[]
  ) {
    AppIOManager.send(event, user, userId, channels);
  }
}
