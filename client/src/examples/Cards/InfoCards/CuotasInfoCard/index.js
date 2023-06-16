// prop-types is library for typechecking of props
import PropTypes from "prop-types";

// @mui material components
import Card from "@mui/material/Card";
import Divider from "@mui/material/Divider";
import Icon from "@mui/material/Icon";

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";

const CuotasInfoCard = ({ color, icon, title, value }) => (
  <Card sx={{ boxShadow: "3px 8px 10px rgba(0, 0, 0, 0.1)" }}>
    <SoftBox p={2} mx={3} display="flex" justifyContent="center">
      <SoftBox
        display="grid"
        justifyContent="center"
        alignItems="center"
        bgColor={color}
        color="white"
        width="2rem"
        height="2rem"
        shadow="md"
        borderRadius="lg"
        variant="gradient"
      >
        <Icon fontSize="default">{icon}</Icon>
      </SoftBox>
    </SoftBox>
    <SoftBox pb={2} px={2} textAlign="center" lineHeight={1.25}>
      <SoftTypography variant="caption" fontWeight="medium">
        {title}
      </SoftTypography>
      <Divider />
      {value && (
        <SoftTypography variant="h6" fontWeight="bold">
          {value}
        </SoftTypography>
      )}
    </SoftBox>
  </Card>
);

CuotasInfoCard.defaultProps = {
  color: "info",
  value: "",
};

CuotasInfoCard.propTypes = {
  color: PropTypes.oneOf(["primary", "secondary", "info", "success", "warning", "error", "dark"]),
  icon: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

export default CuotasInfoCard;
