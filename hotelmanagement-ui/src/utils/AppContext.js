import React, { useContext, useState } from "react";

const AppContext = React.createContext(null);

export const useAppContext = () => useContext(AppContext);

export const AppProvider = ({ children }) => {
  const [token, setToken] = useState(sessionStorage.getItem("token"));

  const updateToken = (newToken) => {
    setToken(newToken);
    sessionStorage.setItem("token", newToken);
  };

  const removeToken = () => {
    sessionStorage.clear();
  };

  return (
    <AppContext.Provider value={{ token, updateToken, removeToken }}>
      {children}
    </AppContext.Provider>
  );
};
