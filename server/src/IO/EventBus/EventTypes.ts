import { UserDoc } from "../../models/db/User/User";

type UserTypes = {
  USER_UPDATED: UserDoc;
};

// we are combining all event types here using intersection operator.
export type EventTypes = UserTypes; // & AnotherType &...
