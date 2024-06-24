import { useState } from "react";

import LoadingContext from "../contexts/LoadingContext";

import Loading from "../components/Loading/Loading";

import { Provider } from "../types/Provider";

export const LoadingProvider = ({ children }: Provider) => {
  const [loading, setLoading] = useState<boolean>(false);

  return (
    <LoadingContext.Provider value={{ loading, setLoading }}>
      {loading && <Loading />}
      {children}
    </LoadingContext.Provider>
  );
};

export default LoadingProvider;
