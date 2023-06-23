import PropTypes from "prop-types";
import Card from "@mui/material/Card";
import Icon from "@mui/material/Icon";
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import ivancik from "assets/images/ivancik.jpg";

function WorkWithTheRockets({ altura, desc, titulo }) {
  return (
    <Card sx={{ height: altura ?? "100%", boxShadow: '0px 0px 9px -5px rgba(0,0,0,0.75)' }} >
      <SoftBox position="relative" height="100%" p={2}>
        <SoftBox
          display="flex"
          flexDirection="column"
          height="100%"
          py={2}
          px={2}
          borderRadius="lg"
          sx={{
            backgroundImage: ({ functions: { linearGradient, rgba }, palette: { gradients } }) =>
              `${linearGradient(
                rgba(gradients.dark.main, 0.8),
                rgba(gradients.dark.state, 0.8)
              )}, url(${ivancik})`,
            backgroundSize: "cover",
          }}
        >
          <SoftBox mb={3} pt={1} shadow="lg">
            <SoftTypography variant="h5" color="white" fontWeight="bold">
              {titulo ?? "Work with the rockets"}
            </SoftTypography>
          </SoftBox>
          <SoftBox mb={2} shadow="lg">
            <SoftTypography variant="body2" color="white">
              {desc ??
                "Wealth creation is an evolutionarily recent positive-sum game. It is all about who take the opportunity first."}
            </SoftTypography>
          </SoftBox>
          <SoftTypography
            component="a"
            href="https://estadisticasbcra.com/"
            target="_blank"
            variant="button"
            color="white"
            fontWeight="medium"
            sx={{
              mt: "auto",
              mr: "auto",
              display: "inline-flex",
              alignItems: "center",
              cursor: "pointer",

              "& .material-icons-round": {
                fontSize: "1.125rem",
                transform: `translate(2px, -0.5px)`,
                transition: "transform 0.2s cubic-bezier(0.34,1.61,0.7,1.3)",
              },

              "&:hover .material-icons-round, &:focus  .material-icons-round": {
                transform: `translate(6px, -0.5px)`,
              },
            }}
          >
            Mas detalles
            <Icon sx={{ fontWeight: "bold" }}>arrow_forward</Icon>
          </SoftTypography>
        </SoftBox>
      </SoftBox>
    </Card>
  );
}

WorkWithTheRockets.propTypes = {
  altura: PropTypes.string.isRequired,
  titulo: PropTypes.string.isRequired,
  desc: PropTypes.string.isRequired,
};

export default WorkWithTheRockets;
