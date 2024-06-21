import { useCallback, useEffect } from "react";

import UserPreferencesContext from "../contexts/UserPreferencesContext";

import { URLS } from "../axiosConfig/URLS";
import { useSendApiReq } from "../hooks/useSendApiReq";

import { UserPreferencesType } from "../types/UserPreferences";
import { Provider } from "../types/Provider";

import Cookies from "js-cookie";
import Swal from "sweetalert2";

export const UserPreferencesProvider = ({ children }: Provider) => {
  const { request, data } = useSendApiReq<UserPreferencesType>();

  useEffect(() => {
    const token = Cookies.get("userPreferencesToken");
    if (token) getUserPreferences(token);
  }, []);

  const getUserPreferences = async (userId: string) => {
    try {
      await request({
        url: URLS.GET_USER_PREFERENCES + userId,
        method: "GET",
      });
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text: "Could not retrieve your data",
        icon: "error",
      });
    }
  };

  const updateUserPreferences = useCallback(
    async (userPreferences: UserPreferencesType, userId: string) => {
      Cookies.set("userPreferencesToken", userId, {
        expires: 1,
        sameSite: "Strict",
      });
      getUserPreferences(userId);

      await request({
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
