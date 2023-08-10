import React from "react";

// prop-types is a library for typechecking of props.
import PropTypes from "prop-types";
import { useUserAuth } from "context/contextManager";
import SoftBox from "components/SoftBox";
import SoftButton from "components/SoftButton";

const LogoutBtn = ({ color }) => {
  const { logout } = useUserAuth();
  return (
    <SoftBox mt={2}>
      <SoftButton variant="gradient" color={color} onClick={() => logout()} fullWidth>
        Cerrar sesión
      </SoftButton>
    </SoftBox>
  );
};

LogoutBtn.defaultProps = {
  color: "info",
};

LogoutBtn.propTypes = {
  color: PropTypes.oneOf(["primary", "secondary", "info", "success", "warning", "error", "dark"]),
};

export default LogoutBtn;
