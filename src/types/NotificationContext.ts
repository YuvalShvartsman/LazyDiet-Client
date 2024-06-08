import { Dispatch, SetStateAction } from "react";

export type NotificationContextType = {
  message: string | null;
  isError: boolean;
  setMessage: Dispatch<SetStateAction<string | null>>;
  setIsError: Dispatch<SetStateAction<boolean>>;
};
