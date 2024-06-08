import { createContext, useState, useCallback } from "react";
import { UserPreferencesType } from "../types/UserPreferences";
import { Provider } from "../types/Provider";

interface UserPreferencesContextProps {
  userPreferences: UserPreferencesType | null;
  updateUser: (userPreferences: UserPreferencesType) => void;
}

const initialContextValue = {
  userPreferences: null,
  updateUser: () => {},
};

const UserPreferencesContext =
  createContext<UserPreferencesContextProps>(initialContextValue);

export const UserPreferencesProvider = ({ children }: Provider) => {
  const [userPreferences, setUserPreferences] =
    useState<UserPreferencesType | null>(null);

  const updateUserPreferences = useCallback(
    (userPreferences: UserPreferencesType) => {
      setUserPreferences(userPreferences);
    },
    []
  );

  return (
    <UserPreferencesContext.Provider
      value={{ userPreferences, updateUser: updateUserPreferences }}
    >
      {children}
    </UserPreferencesContext.Provider>
  );
};

export default UserPreferencesContext;
