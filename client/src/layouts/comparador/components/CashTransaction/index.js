// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

// @mui material components
import Icon from "@mui/material/Icon";

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftButton from "components/SoftButton";

const CashTransaction = ({ color, icon, name, value }) => {
  return (
    <SoftBox key={name} component="li" py={1} pr={1} mb={1}>
      <SoftBox display="flex" justifyContent="space-between" alignItems="center">
        <SoftBox display="flex" alignItems="center">
          <SoftBox mr={1}>
            <SoftButton variant="outlined" color={color} size="medium" iconOnly circular>
              <Icon sx={{ fontWeight: "bold" }}>{icon}</Icon>
            </SoftButton>
          </SoftBox>
          <SoftTypography variant="caption" fontWeight="medium" gutterBottom>
            {name}
          </SoftTypography>
        </SoftBox>
        <SoftTypography align='end' variant="button" color={color} fontWeight="medium" textGradient>
          {value}
        </SoftTypography>
      </SoftBox>
    </SoftBox>
  );
};

// Typechecking props of the CashTransaction
CashTransaction.propTypes = {
  color: PropTypes.oneOf([
    "primary",
    "secondary",
    "info",
    "success",
    "warning",
    "error",
    "light",
    "dark",
  ]).isRequired,
  icon: PropTypes.node.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
};

export default CashTransaction;
