import { createContext, useState, useEffect, useCallback } from "react";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { User } from "../types/User";
import { URLS } from "../axiosConfig/URLS";
import db from "../axiosConfig/axiosInstance";
import { Provider } from "../types/Provider";

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
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const token = Cookies.get("token");
    if (token) {
      getUser(token);
    }
  }, []);

  const getUser = async (token: string) => {
    try {
      const decodedToken: DecodedToken = jwtDecode(token);
      const userId = decodedToken.userId;
      const res = await db.get<{ user: User }>(
        URLS.USER_BY_GOOGLE_ID + `${userId}`
      );
      const { user } = res.data;
      setUser(user);
    } catch (error) {
      console.error("Error finding a user", error);
    }
  };

  const updateUser = useCallback((token: string) => {
    Cookies.set("token", token, { expires: 1, sameSite: "Strict" });
    getUser(token);
  }, []);

  return (
    <UserContext.Provider value={{ user, updateUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
