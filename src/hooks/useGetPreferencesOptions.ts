import { useEffect, useState } from "react";

import { URLS } from "../axiosConfig/URLS";

import { PreferencesOptions } from "../types/UserPreferences";
import { useSendApiReq } from "./useSendApiReq";

function useGetPreferencesOptions() {
  const [preferencesOptions, setPreferencesOptions] =
    useState<PreferencesOptions>();
  const { request } = useSendApiReq<PreferencesOptions>();

  useEffect(() => {
    (async () => {
      try {
        const res = (
          await request({
            url: URLS.PREFERENCES_OPTIONS,
            method: "GET",
          })
        ).data;
        setPreferencesOptions(res);
      } catch (error) {
        console.error("Error finding a user", error);
      }
    })();
  }, []);
  return preferencesOptions;
}

export default useGetPreferencesOptions;
