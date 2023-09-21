export type TLoginData = {
  access_token: string;
  expires_in: number;
  userData: {
    name: string;
    email: string;
  };
};

export type TUserUpdateData = {
  message: string;
};
