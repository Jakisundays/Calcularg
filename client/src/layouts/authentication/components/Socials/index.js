// Soft UI Dashboard React components
import SoftButton from "components/SoftButton";
import SoftBox from "components/SoftBox";
//icons
import TwitterIcon from "@mui/icons-material/Twitter";
import GoogleIcon from "@mui/icons-material/Google";
import { PropTypes } from "prop-types";

function Socials({ color, variant }) {
  const handleSocial = (social) => {
    window.open(`${process.env.REACT_APP_SERVER_URL}/api/users/auth/${social}`, "_self");
  };
  return (
    <SoftBox mb={2} display="flex" justifyContent="center" gap="1rem">
      <SoftButton
        size="large"
        circular
        color={color}
        iconOnly
        variant={variant}
        onClick={() => handleSocial("twitter")}
      >
        <TwitterIcon />
      </SoftButton>
      <SoftButton
        size="large"
        circular
        color={color}
        iconOnly
        variant={variant}
        onClick={() => handleSocial("google")}
      >
        <GoogleIcon />
      </SoftButton>
    </SoftBox>
  );
}

Socials.defaultProps = {
  color: "dark",
  variant: "contained",
};

Socials.propTypes = {
  color: PropTypes.string,
  variant: PropTypes.string,
};

export default Socials;
