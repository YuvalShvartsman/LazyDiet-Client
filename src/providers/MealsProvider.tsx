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
  const [usersMeals, setUsersMeals] = useState<Meal[]>();

  useEffect(() => {}, []);

  const getMeals = useCallback(async (token: string) => {
    // try {
    // } catch (error) {
    //   Swal.fire({
    //     title: "Error!",
    //     text: "Could not find your Meals",
    //     icon: "error",
    //   });
    //   console.error("Error finding a user", error);
    // }
  }, []);

  const saveMeal = useCallback((meal: Meal[]) => {
    try {
      request({
        url: URLS.MEALS,
        method: "POST",
        data: { meal, userData },
      });
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text: "Could not save your meal",
        icon: "error",
      });
    }
  }, []);

  console.log(data);

  return (
    <MealsContext.Provider value={{ usersMeals: data, saveMeal }}>
      {children}
    </MealsContext.Provider>
  );
};

export default UserProvider;
