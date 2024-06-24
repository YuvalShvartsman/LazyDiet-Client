import { createContext } from "react";
import { NotificationContextType } from "../types/NotificationContext";

export const NotificationContext = createContext<NotificationContextType>({
  message: null,
  isError: false,
  setMessage: () => {},
  setIsError: () => {},
});
