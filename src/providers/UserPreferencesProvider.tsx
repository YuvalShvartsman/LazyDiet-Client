import { useCallback } from "react";

import UserPreferencesContext from "../contexts/UserPreferencesContext";

import { URLS } from "../axiosConfig/URLS";
import { useSendApiReq } from "../hooks/useSendApiReq";

import { UserPreferencesType } from "../types/UserPreferences";
import { Provider } from "../types/Provider";

export const UserPreferencesProvider = ({ children }: Provider) => {
  const { request, data } = useSendApiReq<UserPreferencesType>();

  const updateUserPreferences = useCallback(
    (userPreferences: UserPreferencesType, userId: string) => {
      request({
        url: URLS.USER_PREFERENCES,
        method: "POST",
        data: { userPreferences, userId },
      });
    },
    []
  );

  return (
    <UserPreferencesContext.Provider
      value={{ userPreferences: data, updateUserPreferences }}
    >
      {children}
    </UserPreferencesContext.Provider>
  );
};

export default UserPreferencesProvider;
