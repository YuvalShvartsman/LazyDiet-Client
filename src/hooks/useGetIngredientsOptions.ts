import { useEffect, useState } from "react";

import { URLS } from "../axiosConfig/URLS";

import { useSendApiReq } from "./useSendApiReq";
import { Ingredient } from "../types/Ingredient";

function useGetIngredientsOptions() {
  const { request, data } = useSendApiReq<Ingredient[]>();

  useEffect(() => {
    (async () => {
      try {
        await request({
          url: URLS.INGREDIENTS,
          method: "GET",
        });
      } catch (error) {
        console.error("Error, could not find ingredients.", error);
      }
    })();
  }, []);
  return data;
}

export default useGetIngredientsOptions;
