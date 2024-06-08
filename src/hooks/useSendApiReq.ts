import { useCallback, useContext, useEffect, useState } from "react";
import { Status, UseApiResponse } from "../types/UseSendApi";
import { NotificationContext } from "../contexts/NotificationContext";
import axios, { AxiosRequestConfig } from "axios";

export const useSendApiReq = <T>(): UseApiResponse<T> => {
  const [status, setStatus] = useState<Status>("idle");
  const [data, setData] = useState<T>();
  const [loading, setloading] = useState<boolean>(false);
  const notificationContext = useContext(NotificationContext);
  const setNotification = notificationContext.setMessage;
  const setIsError = notificationContext.setIsError;

  const request = useCallback(
    async (config: AxiosRequestConfig) => {
      setloading(true);
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
        setloading(false);
      }
    },
    [setNotification, setIsError]
  );

  useEffect(() => {}, [data]);

  return {
    data,
    setData,
    loading,
    request,
    status,
  };
};
