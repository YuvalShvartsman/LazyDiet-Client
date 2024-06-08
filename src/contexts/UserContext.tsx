import { createContext, useState, useEffect, useCallback } from "react";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { User } from "../types/User";
import { URLS } from "../axiosConfig/URLS";
import db from "../axiosConfig/axiosInstance";
import { Provider } from "../types/Provider";
import Swal from "sweetalert2";
import { useSendApiReq } from "../hooks/useSendApiReq";
import Loading from "../components/Loading/Loading";

type DecodedToken = {
  userId: string;
};

type UserContextProps = {
  user: User | null;
  updateUser: (token: string) => void;
};

const initialContextValue = {
  user: null,
  updateUser: () => {},
};

const UserContext = createContext<UserContextProps>(initialContextValue);

export const UserProvider = ({ children }: Provider) => {
  const { request, data, loading } = useSendApiReq<User>();

  useEffect(() => {
    const token = Cookies.get("token");
    if (token) {
      getUser(token);
    }
  }, []);

  const getUser = (token: string) => {
    try {
      // const decodedToken: DecodedToken = jwtDecode(token);
      // const userId = decodedToken.userId;
      const userId = "664b8daea88378e1372cc757"; // no network fix

      request({
        url: URLS.USER_BY_GOOGLE_ID + `${userId}`,
        method: "GET",
      });
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text: "Could not identify you as a user in LazyDiet",
        icon: "error",
      });
      console.error("Error finding a user", error);
    }
  };

  const updateUser = useCallback((token: string) => {
    Cookies.set("token", token, { expires: 1, sameSite: "Strict" });
    getUser(token);
  }, []);

  return (
    <UserContext.Provider value={{ user: data as User, updateUser }}>
      {loading ? <Loading /> : children}
    </UserContext.Provider>
  );
};

export default UserContext;
