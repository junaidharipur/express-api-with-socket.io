import { BadRequestError } from "../../customErrors/BadRequestError";
import { AppManager } from "../../models/AppManager";
import { UserAuthCredentials } from "../../models/appTypes/Auth";
import { UserAttr, User } from "../../models/db/User/User";
import { JsonWebToken } from "../../utils/JWTWebToken";
import { PasswordManager } from "../../utils/Password";
import { UserDoc } from "../../models/db/User/User";
import { UserLoginData } from "../../models/appTypes/Auth";
import { EventBus } from "../../IO/EventBus/EventSystem";
import { Types } from "mongoose";

type TUserUpdate = Partial<UserAttr> & { _id: string };
export class AuthManager extends AppManager {
  private getUserAuthData = (user: UserDoc): UserLoginData => {
    const tokenData = { userId: user._id };
    const token = JsonWebToken.generateToken(tokenData);

    return {
      access_token: token,
      expires_in: JsonWebToken.getTokenExpirationTime(token),
      userData: user,
    };
  };

  async loginUser(creds: UserAuthCredentials) {
    const { email, password } = creds;

    if (!email || !password)
      throw new BadRequestError("Email or Password is Missing!");

    const user = await User.findOne({ email }).select("+password +_id");
    if (user) {
      const isValid = await PasswordManager.comparePassword(
        password,
        user.password
      );
      if (isValid) {
        return this.getUserAuthData(user);
      }
    }

    throw new BadRequestError('Invalid "email" or "password"');
  }

  async createNewAccount(user: UserAttr) {
    const isAlreadyExist = await User.findOne({ email: user.email }).select(
      "+email"
    );
    if (isAlreadyExist) {
      throw new BadRequestError(
        `Email: "${user.email}" already exist, Please Login!`
      );
    }

    const newUser = User.build(user);
    await newUser.save();

    return this.getUserAuthData(newUser);
  }

  async updateUser(userId: Types.ObjectId, user: TUserUpdate) {
    const fetchedUser = await User.findOne({ _id: userId });
    if (!fetchedUser) {
      throw new BadRequestError(`User with id: "${user._id}" couldn't found!`);
    }

    if (
      !user ||
      typeof user !== "object" ||
      (user.name && user.name?.length < 1)
    ) {
      throw new BadRequestError(`Invalid data provided!`);
    }

    const updateUser = await User.updateOne(
      { _id: fetchedUser._id },
      user
    ).getUpdate();

    if (this.isSystemBusEnabled) {
      EventBus.emit("USER_UPDATED", updateUser as UserDoc, userId);
    }

    return { message: "success" };
  }

  verifyUserToken = async (token: string) => {
    const userData = JsonWebToken.decodeToken(token);
    if (userData) {
      const user = await User.findOne({ _id: userData.userId });
      if (user) return user;
    }
    throw new BadRequestError("Invalid Token!");
  };
}
