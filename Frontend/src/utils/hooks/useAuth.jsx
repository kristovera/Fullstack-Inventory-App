import { useState } from "react";

const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(
    localStorage.getItem("token") ? true : false
  );
  const [superuser, setSuperuser] = useState(false);
  const [accessList, setAccessList] = useState([]);

  const signIn = (token) => {
    localStorage.setItem("token", token);
    setIsAuthenticated(true);
  };

  const signOut = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    setSuperuser(false);
    setAccessList([])
  };

  return {
    isAuthenticated,
    superuser,
    setSuperuser,
    accessList,
    setAccessList,
    signIn,
    signOut,
  };
};

export default useAuth;
