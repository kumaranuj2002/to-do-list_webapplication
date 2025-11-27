import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [isAuth, setIsAuth] = useState(!!token);

  const login = (token) => {
    localStorage.setItem("token", token);
    setToken(token);
    setIsAuth(true);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setIsAuth(false);
  };

  return (
    <AuthContext.Provider value={{ token, isAuth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
