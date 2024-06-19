import { useCallback, useEffect, useState } from "react";

import UserPreferencesContext from "../contexts/UserPreferencesContext";

import { URLS } from "../axiosConfig/URLS";
import { useSendApiReq } from "../hooks/useSendApiReq";

import { UserPreferencesType } from "../types/UserPreferences";
import { Provider } from "../types/Provider";
import Cookies from "js-cookie";

export const UserPreferencesProvider = ({ children }: Provider) => {
  const { request } = useSendApiReq<UserPreferencesType>();
  const [userPreferences, setUserPreferences] = useState<UserPreferencesType>();
  const userPreferencesFromStorage = Cookies.get("userPreferencesToken");

  useEffect(() => {
    if (userPreferencesFromStorage)
      setUserPreferences(
        JSON.parse(userPreferencesFromStorage) as UserPreferencesType
      );
  }, [userPreferencesFromStorage]);

  const updateUserPreferences = useCallback(
    async (userPreferences: UserPreferencesType, userId: string) => {
      const userPreferencesData = (
        await request({
          url: URLS.USER_PREFERENCES,
          method: "POST",
          data: { userPreferences, userId },
        })
      ).data;
      if (!userPreferencesData) return;
      localStorage.setItem(
        "userPreferences",
        JSON.stringify(userPreferencesData)
      );
      Cookies.set("userPreferencesToken", JSON.stringify(userPreferencesData));
      setUserPreferences(userPreferencesData);
    },
    []
  );

  return (
    <UserPreferencesContext.Provider
      value={{ userPreferences, updateUserPreferences }}
    >
      {children}
    </UserPreferencesContext.Provider>
  );
};

export default UserPreferencesProvider;
