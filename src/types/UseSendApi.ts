import { AxiosRequestConfig } from "axios";

export type Status = "loading" | "error" | "idle" | "success";

export type UseApiResponse<T> = {
  data: T | undefined;
  setData: React.Dispatch<React.SetStateAction<T | undefined>>;
  loading: boolean;
  request: (config: AxiosRequestConfig) => void;
  status: Status;
};
