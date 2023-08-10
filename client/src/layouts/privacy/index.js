import React from "react";
import PropTypes from "prop-types";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";

const Privacy = ({ children }) => {
  return (
    <DashboardLayout>
      {children}
    </DashboardLayout>
  );
};

Privacy.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Privacy;
