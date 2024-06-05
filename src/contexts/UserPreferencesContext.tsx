import { createContext, useState, ReactNode } from "react";
import { UserPreferences } from "../types/UserPreferences";

interface UserPreferencesContextProps {
  userPreferences: UserPreferences | null;
  updateUser: (userPreferences: UserPreferences) => void;
}

const UserPreferencesContext = createContext<
  UserPreferencesContextProps | undefined
>(undefined);

interface UserPreferencesProviderProps {
  children: ReactNode;
}

export const UserPreferencesProvider = ({
  children,
}: UserPreferencesProviderProps) => {
  const [userPreferences, setUserPreferences] =
    useState<UserPreferences | null>(null);

  const updateUser = (userPreferences: UserPreferences) => {
    setUserPreferences(userPreferences);
  };

  return (
    <UserPreferencesContext.Provider value={{ userPreferences, updateUser }}>
      {children}
    </UserPreferencesContext.Provider>
  );
};

export default UserPreferencesContext;
