import { useEffect, useState } from "react";

import { URLS } from "../axiosConfig/URLS";

import { PreferencesOptions } from "../types/UserPreferences";
import { useSendApiReq } from "./useSendApiReq";

function useGetPreferencesOptions() {
  const { request, data } = useSendApiReq<PreferencesOptions>();

  useEffect(() => {
    (async () => {
      try {
        await request({
          url: URLS.PREFERENCES_OPTIONS,
          method: "GET",
        });
      } catch (error) {
        console.error("Error, could not find relevent options.", error);
      }
    })();
  }, []);
  return data;
}

export default useGetPreferencesOptions;
