import { createContext, useState, useCallback, useEffect } from "react";
import { UserPreferencesType } from "../types/UserPreferences";
import { Provider } from "../types/Provider";
import { useSendApiReq } from "../hooks/useSendApiReq";
import { URLS } from "../axiosConfig/URLS";

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

export const UserPreferencesProvider = ({ children }: Provider) => {
  const { request, data } = useSendApiReq<UserPreferencesType>();

  const [userPreferences, setUserPreferences] =
    useState<UserPreferencesType | null>(null);

  const updateUserPreferences = useCallback(
    (userPreferences: UserPreferencesType, userId: string) => {
      setUserPreferences(userPreferences);
      request({
        url: URLS.USER_PREFERENCES,
        method: "POST",
        data: { userPreferences, userId },
      });
    },
    []
  );
  useEffect(() => {
    setUserPreferences(data ?? null);
  }, [data]);

  return (
    <UserPreferencesContext.Provider
      value={{ userPreferences, updateUserPreferences }}
    >
      {children}
    </UserPreferencesContext.Provider>
  );
};

export default UserPreferencesContext;
