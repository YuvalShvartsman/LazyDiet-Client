import axios, { AxiosRequestConfig } from "axios";
import { useContext, useState } from "react";
import { useMutation } from "react-query";
import { MessageResponse, UseApiResponse } from "../types/UseSendApi";
import LoadingContext from "../contexts/LoadingContext";

export const useSendApiReq = <T>(): UseApiResponse<T> => {
  const [data, setData] = useState<T>();
  const { setLoading } = useContext(LoadingContext);
  const { mutateAsync } = useMutation(
    async (config: AxiosRequestConfig) => {
      setData(undefined);
      setLoading(true);
      const response = await axios({
        ...config,
        url: config.url,
        baseURL: "http://localhost:3000",
      });
      return response.data;
    },
    {
      onSuccess: (msg: MessageResponse<T>) => {
        setData(msg.data);
      },
      onError: (err: Error) => {
        if (!axios.isAxiosError(err)) return;
        if (err.response) {
          console.log(err);
        }
      },
      onSettled: async () => {
        setLoading(false);
      },
    }
  );

  const request = (config: AxiosRequestConfig) => mutateAsync(config);

  return {
    data,
    setData,
    request,
  };
};
