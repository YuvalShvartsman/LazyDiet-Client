import { AxiosRequestConfig } from "axios";

export type MessageResponse<T> = { data: T };

export type UseApiResponse<T> = {
  data: T | undefined;
  setData: React.Dispatch<React.SetStateAction<T | undefined>>;
  request: (config: AxiosRequestConfig) => Promise<MessageResponse<T>>;
};
