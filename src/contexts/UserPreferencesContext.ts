import { createContext } from "react";
import { UserPreferencesType } from "../types/UserPreferences";

interface UserPreferencesContextProps {
  userPreferences: UserPreferencesType | null;
  updateUserPreferences: (
    userPreferences: UserPreferencesType,
    userId: string
  ) => void;
}

const initialContextValue = {
  userPreferences: null,
  updateUserPreferences: () => {},
};

const UserPreferencesContext =
  createContext<UserPreferencesContextProps>(initialContextValue);

export default UserPreferencesContext;
