import axios from "axios";
import { createContext, useEffect, useState } from "react";
import AxiosService from "./utils/ApiService";

export const UserContext = createContext({});

export function UserContextProvider({ children }) {
  const [userName, setUserName] = useState(null);

  useEffect(() => {
    AxiosService.get("/user/profile").then((response) => {
      setUserName(response.data.userName);
    });
  }, []);
  return (
    <UserContext.Provider value={{ userName, setUserName }}>
      {children}
    </UserContext.Provider>
  );
}
