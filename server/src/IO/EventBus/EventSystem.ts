import { Types } from "mongoose";

import { EventTypes } from "./EventTypes";

type EventListenerCallback<E, T> = (
  event: E,
  data: T,
  userId: Types.ObjectId,
  channels?: string[]
) => void;

export class EventBus {
  public static listeners: {
    [key: string]: EventListenerCallback<any, any>[] | undefined;
  } = {};

  public static emit<K extends keyof EventTypes>(
    event: K,
    data: EventTypes[K],
    userId: Types.ObjectId,
    channels?: string[]
  ) {
    (EventBus.listeners[event] ?? []).forEach((callback) => {
      callback(event, data, userId, channels);
    });
  }

  public static subscribe<K extends keyof EventTypes>(
    event: K,
    callback: EventListenerCallback<K, EventTypes[K]>
  ) {
    const isAlreadySubscribed = (EventBus.listeners[event] || []).some(
      (x) => x === callback
    );
    if (isAlreadySubscribed)
      return console.log("Event Listener is Already Subscribed!");

    const listeners = EventBus.listeners[event] || [];

    listeners.push(callback);

    EventBus.listeners[event] = listeners;
  }

  public static unsubscribe<K extends keyof EventTypes>(
    event: K,
    callback: EventListenerCallback<K, EventTypes[K]>
  ) {
    if (EventBus.listeners[event]) {
      EventBus.listeners[event] = (EventBus.listeners[event] || []).filter(
        (x) => x !== callback
      );
    }
  }
}
