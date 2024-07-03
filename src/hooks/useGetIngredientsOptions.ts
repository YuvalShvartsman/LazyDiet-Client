import { useEffect, useState } from "react";

import { URLS } from "../axiosConfig/URLS";

import { useSendApiReq } from "./useSendApiReq";
import { Ingredient } from "../types/Ingredient";

function useGetIngredientsOptions() {
  const [ingredientsOptions, setIngredientsOptions] = useState<Ingredient[]>();
  const { request } = useSendApiReq<Ingredient[]>();

  useEffect(() => {
    (async () => {
      try {
        const res = (
          await request({
            url: URLS.INGREDIENTS,
            method: "GET",
          })
        ).data;
        setIngredientsOptions(res);
      } catch (error) {
        console.error("Error, could not find ingredients.", error);
      }
    })();
  }, []);
  return ingredientsOptions;
}

export default useGetIngredientsOptions;
