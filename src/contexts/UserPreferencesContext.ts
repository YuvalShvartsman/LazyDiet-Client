import { createContext } from "react";
import { UserPreferencesType } from "../types/UserPreferences";

interface UserPreferencesContextProps {
  userPreferences: UserPreferencesType | undefined;
  updateUserPreferences: (
    userId: string,
    userPreferences: UserPreferencesType
  ) => void;
}

const initialContextValue = {
  userPreferences: undefined,
  updateUserPreferences: () => {},
};

const UserPreferencesContext =
  createContext<UserPreferencesContextProps>(initialContextValue);

export default UserPreferencesContext;
