import { useEffect, useState } from "react";

import { NotificationContext } from "../contexts/NotificationContext";

import { Provider } from "../types/Provider";

import { notification } from "antd";

export const NotificationProvider = ({ children }: Provider) => {
  const [message, setMessage] = useState<string | null>(null);
  const [isError, setIsError] = useState<boolean>(false);

  const handleClose = () => setMessage(null);

  useEffect(() => {
    if (message) {
      notification.open({
        message: isError ? "Error" : "Success",
        description: message,
        placement: "bottomRight",
        duration: 6,
        onClose: handleClose,
        style: {
          fontFamily: "segoe ui",
          fontSize: "110%",
          display: "flex",
          alignItems: "center",
          gap: "0.5rem",
        },
      });
    }
  }, [message, isError]);

  return (
    <NotificationContext.Provider
      value={{ message, setMessage, isError, setIsError }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

export default NotificationProvider;
