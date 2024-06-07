import { createContext, useState } from "react";
import { Provider } from "../types/Provider";

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
  const [loading, setLoading] = useState<boolean | null>(null);

  const updateLoading = (isLoading: boolean) => [setLoading(isLoading)];

  return (
    <LoadingContext.Provider value={{ loading, updateLoading }}>
      {children}
    </LoadingContext.Provider>
  );
};

export default LoadingContext;
