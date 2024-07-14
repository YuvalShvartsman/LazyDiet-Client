import { useEffect, useCallback, useContext, useState } from "react";

import UserContext from "../contexts/UserContext";

import { URLS } from "../axiosConfig/URLS";
import { useSendApiReq } from "../hooks/useSendApiReq";

import { Provider } from "../types/Provider";

import Swal from "sweetalert2";
import { Meal } from "../types/Meal";
import MealsContext from "../contexts/MealsContext";

export const UserProvider = ({ children }: Provider) => {
  const { request, data } = useSendApiReq<Meal[]>();
  const { userData } = useContext(UserContext);

  let [currentUser, setCurrentUser] = useState<string>();

  const [usersMeals, setUsersMeals] = useState<Meal[]>();

  useEffect(() => {
    if (userData) {
      setCurrentUser(userData._id);
    }
  }, [userData]);

  const saveMeals = useCallback(
    (meals: Meal[]) => {
      try {
        if (currentUser && meals) {
          request({
            url: URLS.MEALS,
            method: "POST",
            data: { meals, userId: currentUser },
          });
        }
      } catch (error) {
        Swal.fire({
          title: "Error!",
          text: "Could not save your meal",
          icon: "error",
        });
      }
    },
    [currentUser]
  );

  return (
    <MealsContext.Provider value={{ usersMeals: data, saveMeals }}>
      {children}
    </MealsContext.Provider>
  );
};

export default UserProvider;
