import { Server, Socket } from "socket.io";
import { BadRequestError } from "../customErrors/BadRequestError";
import { JsonWebToken } from "../utils/JWTWebToken";
import { User } from "../models/db/User/User";
import { EventTypes } from "./EventBus/EventTypes";
import { Types } from "mongoose";

// these Scoped I/O Managers contain IIFE which would automatically register scoped events in each IO manager on import.
import "./UserIOManager";

export class AppIOManager {
  private static appIO: Server;

  constructor(appIO: Server) {
    AppIOManager.appIO = appIO;
  }

  init() {
    AppIOManager.registerConnectionHandshakeHandler();
  }

  private static registerConnectionHandshakeHandler() {
    AppIOManager.appIO.use(async (socket, next) => {
      try {
        console.log(`[ INCOMING I/O REQUEST ]`);

        if (socket.handshake.query && socket.handshake.query.token) {
          const { token } = socket.handshake.query;

          const tokenData = JsonWebToken.decodeToken(token as string);
          if (tokenData) {
            const user = await User.findOne({ _id: tokenData.userId }).select(
              "+name +email +_id"
            );
            if (user) {
              (socket as any).user = user;
              return next();
            }
          }
        }

        next(new BadRequestError("Invalid Token!"));
      } catch (error) {
        next(
          new BadRequestError(
            `Something Went Wrong during connection Handshake!: ${error}`
          )
        );
      }
    });

    AppIOManager.appIO.on("connection", AppIOManager.socketConnectionHandler);
  }

  private static socketConnectionHandler(socket: Socket) {
    const user = (socket as any).user;

    socket.join(`${user._id}`);
    console.log(`CONNECTED USER IS:`, user);
  }

  public static send<E extends keyof EventTypes>(
    event: E,
    data: EventTypes[E],
    userId: Types.ObjectId,
    channels?: string[]
  ) {
    console.log(
      `[ EVENT ] TYPE: ${event}, CHANNEL: ${userId}, DATA: ${JSON.stringify(
        data
      )}`
    );

    if (channels) {
      AppIOManager.appIO.in(channels).emit(event, { data, source: userId });
    } else {
      AppIOManager.appIO.to(`${userId}`).emit(event, { data, source: userId });
    }
  }
}
