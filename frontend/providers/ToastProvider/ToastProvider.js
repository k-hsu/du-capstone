import React, { useMemo, useState } from "react";
import ToastContext from "../contexts/ToastContext";

const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);
  const value = useMemo(() => ({ toasts, setToasts }), [toasts]);

  return (
    <ToastContext.Provider value={value}>{children}</ToastContext.Provider>
  );
};

export default ToastProvider;
