// @mui material components
import Card from "@mui/material/Card";
// import Divider from "@mui/material/Divider";
import Icon from "@mui/material/Icon";
import PropTypes from "prop-types";

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";

// Billing page components
import CashTransaction from "../CashTransaction";

const Efectivo = ({ mp, pf }) => {
  const showFormattedDate = () => {
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    const today = new Date();
    const day = today.getDate();
    const month = today.getMonth();
    const year = today.getFullYear();

    const formattedDate = `${day} ${months[month]} ${year}`;
    return formattedDate;
  };

  return (
    <Card sx={{ height: "100%" }}>
      <SoftBox display="flex" justifyContent="space-between" alignItems="center" pt={3} px={2}>
        <SoftTypography variant="h5" fontWeight="medium">
          Si tengo el efectivo y lo invierto en:
        </SoftTypography>
        <SoftBox display="flex" alignItems="flex-start">
          <SoftBox color="text" mr={0.5} lineHeight={0}>
            <Icon color="inherit" fontSize="small">
              date_range
            </Icon>
          </SoftBox>
          <SoftTypography variant="button" color="text" fontWeight="regular">
            {showFormattedDate()}
          </SoftTypography>
        </SoftBox>
      </SoftBox>
      <SoftBox pt={3} pb={2} px={2}>
        <SoftBox mb={2}>
          <SoftTypography
            variant="caption"
            color="text"
            fontWeight="bold"
            textTransform="uppercase"
          >
            FCI MercadoPago
          </SoftTypography>
        </SoftBox>
        <SoftBox
          component="ul"
          display="flex"
          flexDirection="column"
          p={0}
          m={0}
          sx={{ listStyle: "none" }}
        >
          <CashTransaction color="primary" icon="percent" name="Anual" value="80 %" />
          <CashTransaction
            color={mp.inversionAnual > 0 ? 'success' : 'error'}
            icon={mp.inversionAnual > 0 ? 'arrow_upward' : 'arrow_downward'}
            name="Sin sacar el dinero en 12 meses"
            value={`$ ${mp.inversionAnual}`}
          />
          <CashTransaction
            color={mp.inversionAnualMenosCuotas > 0 ? 'success' : 'error'}
            icon={mp.inversionAnualMenosCuotas > 0 ? 'arrow_upward' : 'arrow_downward'}
            name="Retirando la cuota mes a mes para pagar la tarjeta"
            value={`$ ${mp.inversionAnualMenosCuotas}`}
          />
        </SoftBox>
        <SoftBox mt={1} mb={2}>
          <SoftTypography
            variant="caption"
            color="text"
            fontWeight="bold"
            textTransform="uppercase"
          >
            Plazo fijo:
          </SoftTypography>
        </SoftBox>
        <SoftBox
          component="ul"
          display="flex"
          flexDirection="column"
          p={0}
          m={0}
          sx={{ listStyle: "none" }}
        >
          <CashTransaction color="primary" icon="percent" name="Anual" value="97 %" />
          <CashTransaction
            color={pf.inversionAnual > 0 ? 'success' : 'error'}
            icon={pf.inversionAnual > 0 ? 'arrow_upward' : 'arrow_downward'}
            name="Sin sacar el dinero en 12 meses"
            value={`$ ${pf.inversionAnual}`}
          />
          <CashTransaction
            color={pf.inversionAnualMenosCuotas > 0 ? 'success' : 'error'}
            icon={pf.inversionAnualMenosCuotas > 0 ? 'arrow_upward' : 'arrow_downward'}
            name="Retirando la cuota mes a mes para pagar la tarjeta"
            value={`$ ${pf.inversionAnualMenosCuotas}`}
          />
        </SoftBox>
      </SoftBox>
    </Card>
  );
};

Efectivo.propTypes = {
  mp: PropTypes.shape({
    inversionAnual: PropTypes.number,
    inversionAnualMenosCuotas: PropTypes.number,
  }),
  pf: PropTypes.shape({
    inversionAnual: PropTypes.number,
    inversionAnualMenosCuotas: PropTypes.number,
  }),
};

export default Efectivo;
