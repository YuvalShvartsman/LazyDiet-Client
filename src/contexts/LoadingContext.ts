import { createContext } from "react";

type LoadingContextProps = {
  loading: boolean;
  setLoading: (loading: boolean) => void;
};

const initialContextValue = {
  loading: false,
  setLoading: () => {},
};

const LoadingContext = createContext<LoadingContextProps>(initialContextValue);

export default LoadingContext;
