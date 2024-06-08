import { useCallback, useContext, useState } from "react";
import { Status, UseApiResponse } from "../types/UseSendApi";
import { NotificationContext } from "../contexts/NotificationContext";
import axios, { AxiosRequestConfig } from "axios";
import LoadingContext from "../contexts/LoadingContext";

export const useSendApiReq = <T>(): UseApiResponse<T> => {
  const { setLoading } = useContext(LoadingContext);
  const [status, setStatus] = useState<Status>("idle");
  const [data, setData] = useState<T>();
  // const [loading, setLoading] = useState<boolean>(false);
  const notificationContext = useContext(NotificationContext);
  const setNotification = notificationContext.setMessage;
  const setIsError = notificationContext.setIsError;

  const request = useCallback(async (config: AxiosRequestConfig) => {
    setLoading(true);
    setStatus("loading");
    setData(undefined);

    try {
      const response = await axios({
        ...config,
        url: config.url,
        baseURL: "http://localhost:3000",
      });
      const responseData = response.data;

      setData(responseData);

      setStatus("success");
    } catch (err) {
      if (axios.isAxiosError(err) && err.response) {
        setNotification(`Error:${err.response.data}`);

        setIsError(true);
      }
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    data,
    setData,
    loading: status === "loading",
    request,
    status,
  };
};
