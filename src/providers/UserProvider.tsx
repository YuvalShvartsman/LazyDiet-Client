import { useEffect, useCallback, useContext } from "react";

import UserContext from "../contexts/UserContext";

import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

import { URLS } from "../axiosConfig/URLS";
import { useSendApiReq } from "../hooks/useSendApiReq";

import { User } from "../types/User";
import { Provider } from "../types/Provider";

import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import UserPreferencesContext from "../contexts/UserPreferencesContext";

type DecodedToken = {
  userId: string;
};

export const UserProvider = ({ children }: Provider) => {
  const navigate = useNavigate();
  const { request, data } = useSendApiReq<User>();
  const { getUserPreferences } = useContext(UserPreferencesContext);

  useEffect(() => {
    const token = Cookies.get("userToken");
    if (token) getUser(token);
  }, []);

  const getUser = useCallback(async (token: string) => {
    try {
      const decodedToken: DecodedToken = jwtDecode(token);
      const userId = decodedToken.userId;
      if (userId)
        request({
          url: URLS.USER_BY_GOOGLE_ID + `${userId}`,
          method: "GET",
        });
    } catch (error) {
      navigate("/login");
      Swal.fire({
        title: "Error!",
        text: "Could not identify you as a user in LazyDiet",
        icon: "error",
      });
      console.error("Error finding a user", error);
    }
  }, []);

  const updateUser = useCallback((token: string) => {
    Cookies.set("userToken", token, { expires: 1, sameSite: "Strict" });
    getUser(token);
    getUserPreferences(token);
  }, []);

  return (
    <UserContext.Provider value={{ userData: data, updateUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
