import { createContext, useState } from "react";
import Loading from "../components/Loading/Loading";
import { Provider } from "../types/Provider";

type LoadingContextProps = {
  loading: boolean;
  setLoading: (loading: boolean) => void;
};

const initialContextValue = {
  loading: false,
  setLoading: () => {},
};

const LoadingContext = createContext<LoadingContextProps>(initialContextValue);

export const LoadingProvider = ({ children }: Provider) => {
  const [loading, setLoading] = useState<boolean>(false);

  console.log(loading);
  return (
    <LoadingContext.Provider value={{ loading, setLoading }}>
      {loading && <Loading />}
      {children}
    </LoadingContext.Provider>
  );
};

export default LoadingContext;
