import { useState, useCallback, useEffect } from "react";

import UserPreferencesContext from "../contexts/UserPreferencesContext";

import { URLS } from "../axiosConfig/URLS";
import { useSendApiReq } from "../hooks/useSendApiReq";

import { UserPreferencesType } from "../types/UserPreferences";
import { Provider } from "../types/Provider";

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

export default UserPreferencesProvider;
