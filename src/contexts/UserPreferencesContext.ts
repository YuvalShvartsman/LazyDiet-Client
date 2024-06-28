import { createContext } from "react";
import { UserPreferencesType } from "../types/UserPreferences";

interface UserPreferencesContextProps {
  userPreferences: UserPreferencesType | undefined;
  updateUserPreferences: (
    userId: string,
    userPreferences: UserPreferencesType
  ) => void;
  getUserPreferences: (userId: string) => void;
}

const initialContextValue = {
  userPreferences: undefined,
  updateUserPreferences: () => {},
  getUserPreferences: () => {},
};

const UserPreferencesContext =
  createContext<UserPreferencesContextProps>(initialContextValue);

export default UserPreferencesContext;
