import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
// import useHttpClient from './useHttpClient';

let logoutTimer;

const useAuth = () => {
  const [token, setToken] = useState(false);
  const [tokenExpirationDate, setTokenExpirationDate] = useState();
  const [userId, setUserId] = useState(null);
  const [user, setUser] = useState({});
  const navigate = useNavigate();

  //useCallback((uid, token, expirationDate)
  const login = useCallback((user, expirationDate) => {
    setToken(user.token);
    setUserId(user.userId);
    setUser(user);

    const tokenExpirationDate = expirationDate || new Date(new Date().getTime() + 1000 * 60 * 60);
    setTokenExpirationDate(tokenExpirationDate);
    localStorage.setItem(
      "userData",
      JSON.stringify({
        userId: user.userId,
        token: user.token,
        email: user.email,
        username: user.username,
        avatar: user.avatar,
        expiration: tokenExpirationDate.toISOString(),
      })
    );
  }, []);

  const logout = useCallback(() => {
    setToken(null);
    setUserId(null);
    setUser(null);
    setTokenExpirationDate(null);
    localStorage.removeItem("userData");

    fetch(`${process.env.REACT_APP_BASE_URL}/api/users/auth/logout`, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Credentials": true,
      },
      credentials: "include",
    });
    navigate("/");
  }, []);

  useEffect(() => {
    if (token && tokenExpirationDate) {
      const remainingTime = tokenExpirationDate.getTime() - new Date().getTime();
      logoutTimer = setTimeout(logout, remainingTime);
    } else {
      clearTimeout(logoutTimer);
    }
  }, [token, logout, tokenExpirationDate]);

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("userData"));
    if (storedData && new Date(storedData.expiration) > new Date()) {
      login(storedData, new Date(storedData.expiration));
    }
  }, [login]); // [] => only run once when the cmp is mounted first time
  return { token, login, logout, userId, user, setUser };
};

export default useAuth;
