import { MessageResponse } from "./UseSendApi";

export type UserInfo = {
  _id?: string;
  googleId: string;
  email: string;
  name: string;
  picture: string;
  isAdmin?: string;
};
export type User = {
  promise?: Promise<MessageResponse<User>>;
  user?: UserInfo;
};
