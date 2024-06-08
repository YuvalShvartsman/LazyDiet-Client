import { createContext, useState } from "react";
import { Provider } from "../types/Provider";
import Loading from "../components/Loading/Loading";

type LoadingContextProps = {
  loading: boolean | null;
  updateLoading: (loading: boolean) => void;
};

const initialContextValue = {
  loading: false,
  updateLoading: () => {},
};

const LoadingContext = createContext<LoadingContextProps>(initialContextValue);

export const LoadingProvider = ({ children }: Provider) => {
  const [loading, setLoading] = useState<boolean | null>(false);

  const updateLoading = (isLoading: boolean) => setLoading(isLoading);

  return (
    <LoadingContext.Provider value={{ loading, updateLoading }}>
      {loading ? <Loading /> : children}
    </LoadingContext.Provider>
  );
};

export default LoadingContext;
