// @mui material components
import Card from "@mui/material/Card";
import Icon from "@mui/material/Icon";
import PropTypes from "prop-types";

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";

// Soft UI Dashboard React examples
import TimelineItem from "examples/Timeline/TimelineItem";
import CuotasInfoCard from "examples/Cards/InfoCards/CuotasInfoCard";
import { agregarEspacios } from "utils/calculadora";

const CuotasOverview = ({ cuotasVisuales }) => {
  return (
    <>
      <SoftBox bgColor="dark" variant="gradient" borderRadius="lg" shadow="lg" pt={1} pb={1}>
        <SoftTypography color="white" variant="h3" align="center" fontWeight="medium">
          Cuotas que se adaptan mensualmente según la inflación acumulada:
        </SoftTypography>
      </SoftBox>
      <SoftBox
        p={2}
        sx={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          gap: "1rem",
          width: "100%",
          justifyContent: "center",
        }}
      >
        {cuotasVisuales &&
          cuotasVisuales.map((cuota, index) => (
            <CuotasInfoCard
              key={index}
              icon="receipt_long"
              color="info"
              title={`Cuota #${index + 1}`}
              value={`$ ${agregarEspacios(Math.round(cuota))}`}
            />
          ))}
      </SoftBox>
    </>
  );
};

CuotasOverview.propTypes = {
  cuotasVisuales: PropTypes.arrayOf(PropTypes.number),
};

export default CuotasOverview;
