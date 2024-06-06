import { createContext, useState, ReactNode, useCallback } from "react";
import { UserPreferencesType } from "../types/UserPreferences";
import { Provider } from "../types/Provider";

interface UserPreferencesContextProps {
  userPreferences: UserPreferencesType | null;
  updateUser: (userPreferences: UserPreferencesType) => void;
}

const UserPreferencesContext = createContext<
  UserPreferencesContextProps | undefined
>(undefined);

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
