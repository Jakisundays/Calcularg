import { UserAuthContext } from "../context/contextManager";
import useAuth from "../hooks/useAuth";
import PropTypes from "prop-types"; // Import PropTypes

const AppProviders = ({ children }) => {
  const { token, login, logout, user, setUser } = useAuth();

  return (
    <UserAuthContext.Provider
      value={{
        isLoggedIn: !!token,
        login,
        logout,
        currentUser: user,
        setUser,
        token,
      }}
    >
      {children}
    </UserAuthContext.Provider>
  );
};

AppProviders.propTypes = {
  children: PropTypes.node.isRequired, // You can adjust the prop type as needed
};

export default AppProviders;
