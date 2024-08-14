import { useEffect, useContext, useState } from "react";

import UserContext from "../contexts/UserContext";
import MenuContext from "../contexts/MenuContext";

import { useSendApiReq } from "../hooks/useSendApiReq";

import { URLS } from "../axiosConfig/URLS";

import { Provider } from "../types/Provider";
import { MonthlyMenu } from "../types/Menu";

import Swal from "sweetalert2";
import UserPreferencesContext from "../contexts/UserPreferencesContext";

export const MenuProvider = ({ children }: Provider) => {
  const { request, data } = useSendApiReq<MonthlyMenu>();
  const { userData } = useContext(UserContext);
  const { userPreferences } = useContext(UserPreferencesContext);

  let [currentUser, setCurrentUser] = useState<string>();

  useEffect(() => {
    (() => {
      try {
        if (userData && userPreferences) {
          request({
            url: URLS.MENU,
            method: "GET",
          });
        }
      } catch (error) {
        Swal.fire({
          title: "Error!",
          text: "Could not save your find your menu!",
          icon: "error",
        });
      }
    })();
  }, [userData, userPreferences]);

  return (
    <MenuContext.Provider
      value={{ monthlyMenu: data, getMonthlyMenu: () => {} }}
    >
      {children}
    </MenuContext.Provider>
  );
};

export default MenuProvider;
