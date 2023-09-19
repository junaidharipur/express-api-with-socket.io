import mongoose, { Types } from "mongoose";
import { PasswordManager } from "../../../utils/Password";

export interface UserAttr {
  name: string;
  email: string;
  password: string;
}

export interface UserDoc extends UserAttr, mongoose.Document {
  _id: Types.ObjectId;
  createAt: Date;
  updatedAt: Date;
}

interface UserModel extends mongoose.Model<UserDoc> {
  build(attr: UserAttr): UserDoc;
}

const userSchema = new mongoose.Schema<UserDoc, UserModel>(
  {
    name: { type: String },
    email: { type: String, unique: true },
    password: { type: String },
  },
  { timestamps: true, versionKey: false }
);

userSchema.pre("save", async function (done) {
  if (this.isModified("password")) {
    const password = this.get("password");
    const pwdHash = await PasswordManager.hashPassword(password);
    this.set("password", pwdHash);
  }

  done();
});

const User = mongoose.model<UserDoc, UserModel>("User", userSchema);

User.build = (userAttr: UserAttr): UserDoc => {
  return new User(userAttr);
};

export { User };
