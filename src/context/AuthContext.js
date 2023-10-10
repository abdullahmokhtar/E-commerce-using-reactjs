import { createContext, useState } from "react";

export const AuthContext = createContext({
  userIsLoggedIn: localStorage.getItem("token")? true: false,
  setUserIsLoggedIn: () => {},
});

const AuthContextProvider = ({ children }) => {
  const [userIsLoggedIn, setUserIsLoggedIn] = useState(
    localStorage.getItem("token") ? true : false
  );
  return (
    <AuthContext.Provider value={{ userIsLoggedIn, setUserIsLoggedIn }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
