// @mui material components
import Card from "@mui/material/Card";
// import Divider from "@mui/material/Divider";
import Icon from "@mui/material/Icon";

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";

// Billing page components
import CashTransaction from "../CashTransaction";

const Efectivo = () => {
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
          <CashTransaction color="error" icon="percent" name="Anual" value="$2,500" />
          <CashTransaction
            color="success"
            icon="arrow_upward"
            name="Sin sacar el dinero en 12 meses"
            value="$ 2,000"
          />
          <CashTransaction
            color="success"
            icon="arrow_upward"
            name="Retirando la cuota mes a mes para pagar la tarjeta"
            value="$ 2,000"
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
          <CashTransaction color="error" icon="percent" name="Anual" value="$2,500" />
          <CashTransaction
            color="success"
            icon="arrow_upward"
            name="Sin sacar el dinero en 12 meses"
            value="$ 2,000"
          />
          <CashTransaction
            color="success"
            icon="arrow_upward"
            name="Retirando la cuota mes a mes para pagar la tarjeta"
            value="$ 2,000"
          />
        </SoftBox>
      </SoftBox>
    </Card>
  );
};

export default Efectivo;
