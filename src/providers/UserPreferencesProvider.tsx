import { useCallback, useEffect } from "react";

import UserPreferencesContext from "../contexts/UserPreferencesContext";

import { URLS } from "../axiosConfig/URLS";
import { useSendApiReq } from "../hooks/useSendApiReq";

import { UserPreferencesType } from "../types/UserPreferences";
import { Provider } from "../types/Provider";

import Cookies from "js-cookie";
import Swal from "sweetalert2";
import { jwtDecode } from "jwt-decode";

type DecodedToken = {
  userId: string;
};

export const UserPreferencesProvider = ({ children }: Provider) => {
  const { request, data } = useSendApiReq<UserPreferencesType>();

  useEffect(() => {
    const token = Cookies.get("userToken");
    if (token) getUserPreferences(token);
  }, []);

  const getUserPreferences = async (token: string) => {
    try {
      const decodedToken: DecodedToken = jwtDecode(token);
      const userId = decodedToken.userId;
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
    (userId: string, userPreferences: UserPreferencesType) => {
      const stringifiedUserPreferences = JSON.stringify(userPreferences);
      Cookies.set("userPreferences", stringifiedUserPreferences, {
        expires: 1,
        sameSite: "Strict",
      });
      try {
        request({
          url: URLS.USER_PREFERENCES,
          method: "POST",
          data: { userPreferences, userId: userId },
        });
      } catch (error) {
        Swal.fire({
          title: "Error!",
          text: "Could not save your data",
          icon: "error",
        });
      }
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