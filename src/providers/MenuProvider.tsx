import { useEffect, useContext } from "react";

import MenuContext from "../contexts/MenuContext";

import { useSendApiReq } from "../hooks/useSendApiReq";

import { URLS } from "../axiosConfig/URLS";

import { Provider } from "../types/Provider";
import { MonthlyMenu } from "../types/Menu";

import Swal from "sweetalert2";
import UserPreferencesContext from "../contexts/UserPreferencesContext";

export const MenuProvider = ({ children }: Provider) => {
  const { request, data } = useSendApiReq<MonthlyMenu>();

  const { userPreferences } = useContext(UserPreferencesContext);

  useEffect(() => {
    (() => {
      try {
        if (userPreferences) {
          request({
            url: URLS.MENU,
            method: "POST",
            data: userPreferences,
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
  }, [userPreferences]);

  return (
    <MenuContext.Provider
      value={{ monthlyMenu: data, getMonthlyMenu: () => {} }}
    >
      {children}
    </MenuContext.Provider>
  );
};

export default MenuProvider;
