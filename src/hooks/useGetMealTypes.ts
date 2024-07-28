import { useEffect } from "react";

import { URLS } from "../axiosConfig/URLS";

import { useSendApiReq } from "./useSendApiReq";
import { MealType } from "../types/MealType";

function useGetMealTypes() {
  const { request, data } = useSendApiReq<MealType[]>();

  useEffect(() => {
    (async () => {
      try {
        await request({
          url: URLS.GET_MEAL_TYPES,
          method: "GET",
        });
      } catch (error) {
        console.error("Error, could not find relevent options.", error);
      }
    })();
  }, []);
  return data;
}

export default useGetMealTypes;
