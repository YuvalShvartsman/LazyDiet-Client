import { createContext, useEffect, useCallback, useState } from "react";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { User, UserInfo } from "../types/User";
import { URLS } from "../axiosConfig/URLS";
import { Provider } from "../types/Provider";
import Swal from "sweetalert2";
import { useSendApiReq } from "../hooks/useSendApiReq";

type DecodedToken = {
  userId: string;
};

type UserContextProps = {
  userData: User | null | undefined;
  updateUser: (token: string) => void;
};

const initialContextValue = {
  userData: undefined,
  updateUser: () => {},
};

const UserContext = createContext<UserContextProps>(initialContextValue);

export const UserProvider = ({ children }: Provider) => {
  const { request } = useSendApiReq<UserInfo>();
  const [userData, setUserData] = useState<User | null | undefined>(undefined);

  console.log(userData);

  useEffect(() => {
    const token = Cookies.get("token");
    if (token) getUser(token);
  }, []);

  const getUser = useCallback((token: string) => {
    try {
      const decodedToken: DecodedToken = jwtDecode(token);
      const userId = decodedToken.userId;
      // const userId = "664b8daea88378e1372cc757"; // no network fix
      setUserData({
        promise: new Promise(async () => {
          const userInfo = (
            await request({
              url: URLS.USER_BY_GOOGLE_ID + `${userId}`,
              method: "GET",
            })
          ).data;
          setUserData({ user: userInfo });
        }),
      });
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text: "Could not identify you as a user in LazyDiet",
        icon: "error",
      });
      console.error("Error finding a user", error);
    }
  }, []);

  const updateUser = useCallback((token: string) => {
    Cookies.set("token", token, { expires: 1, sameSite: "Strict" });
    getUser(token);
  }, []);

  return (
    <UserContext.Provider value={{ userData, updateUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
