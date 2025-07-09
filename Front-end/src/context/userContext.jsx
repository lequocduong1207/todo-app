import { createContext, useContext, useEffect, useState } from "react";
import instance from "../services/axios.customize";

const UserContext = createContext({
  isAuthenticated: false,
  name: "",
  email: "",
  loading: true,
  setUser: () => {},
});

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState({
    isAuthenticated: false,
    name: "",
    email: "",
    loading: true
  });

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("access_token");
      if (token) {
        try {
          const res = await instance.get("/v1/api/account");
          setUser({
            isAuthenticated: true,
            name: res.name,
            email: res.email,
            loading: false
          });
        } catch (error) {
          setUser({
            isAuthenticated: false,
            name: "",
            email: "",
            loading: false
          });
        }
      } else {
        setUser((prev) => ({ ...prev, loading: false }));
      }
    };

    fetchUser();
  }, []);

  return (
    <UserContext.Provider value={{ ...user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
