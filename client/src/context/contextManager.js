import { createContext, useContext } from "react";

export const UserAuthContext = createContext({
  isLoggedIn: false,
  token: null,
  currentUser: {},
  login: () => {},
  logout: () => {},
});

export const useUserAuth = () => useContext(UserAuthContext);

