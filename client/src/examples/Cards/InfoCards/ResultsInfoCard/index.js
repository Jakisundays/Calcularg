// prop-types is library for typechecking of props
import PropTypes from "prop-types";

// @mui material components
import Card from "@mui/material/Card";
import Divider from "@mui/material/Divider";
import Icon from "@mui/material/Icon";

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";


const ResultsInfoCard = ({ color, icon, title, description, value }) => (
  <Card sx={{ boxShadow: "0px 0px 9px -5px rgba(0,0,0,0.75)" }}>
    <SoftBox p={2} mx={3} display="flex" justifyContent="center">
      <SoftBox
        display="grid"
        justifyContent="center"
        alignItems="center"
        bgColor={color}
        color="white"
        width="2.35rem"
        height="2.35rem"
        shadow="md"
        borderRadius="lg"
        variant="gradient"
      >
        <Icon fontSize="default">{icon}</Icon>
      </SoftBox>
    </SoftBox>
    <SoftBox pb={2} px={2} textAlign="center" lineHeight={1.25}>
      <SoftTypography variant="h6" fontWeight="medium" textTransform="capitalize">
        {title}
      </SoftTypography>
      {description && (
        <SoftTypography variant="caption" fontWeight="regular">
          {description}
        </SoftTypography>
      )}
      {description && !value ? null : <Divider />}
      {value && (
        <SoftTypography variant="h6" fontWeight="bold">
          {value}
        </SoftTypography>
      )}
    </SoftBox>
  </Card>
);

ResultsInfoCard.defaultProps = {
  color: "info",
  value: "",
  description: "",
};

ResultsInfoCard.propTypes = {
  color: PropTypes.oneOf(["primary", "secondary", "info", "success", "warning", "error", "dark"]),
  icon: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

export default ResultsInfoCard;

