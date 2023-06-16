import React, { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftInput from "components/SoftInput";

import { Icon } from "@mui/material";
import SoftButton from "components/SoftButton";

const Infleta = () => {
  const [cantidadCuotas, setCantidadCuotas] = useState("");
  const [currentColor, setCurrentColor] = useState("#3acaeb"); // Initial color

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentColor((prevColor) => (prevColor === "#3acaeb" ? "#17c1e8" : "#3acaeb")); // Toggle between colors
    }, 2000);

    return () => {
      clearInterval(interval); // Clear the interval when component unmounts
    };
  }, []);

  const handleChange = (event) => {
    setCantidadCuotas(event.target.value);
  };
  return (
    <Card>
      <SoftBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
        <SoftBox>
          <SoftTypography variant="h6" gutterBottom>
            ¿Cuotas o Contado?
          </SoftTypography>
          <SoftBox display="flex" gap={1} alignItems="center" lineHeight={0}>
            <Icon
              sx={{
                fontWeight: "bold",
                color: currentColor,
                transition: "color 0.3s ease-in-out",
              }}
              fontSize="large"
            >
              price_change
            </Icon>
            <SoftTypography variant="caption" fontWeight="regular" color="text">
              <strong> Mejora tu estrategia de pagos: </strong>calcula si te conviene cuotas o pago
              único.
            </SoftTypography>
          </SoftBox>
        </SoftBox>
        <SoftBox color="text" px={2}>
          <Icon sx={{ cursor: "pointer", fontWeight: "bold" }} fontSize="small">
            restart_alt
          </Icon>
        </SoftBox>
      </SoftBox>
      <SoftBox
        component="form"
        role="form"
        display="flex"
        flexDirection="column"
        justifyContent="space-around"
        gap={2}
        pl={2}
        pr={2}
        pb={2}
      >
        <SoftBox>
          <SoftBox pl={0.5}>
            <SoftTypography variant="caption" fontWeight="regular" color="text">
              Ingresá el precio de contado
            </SoftTypography>
          </SoftBox>
          <SoftInput
            placeholder="10000"
            icon={{
              component: "attach_money",
              direction: "right",
            }}
          />
        </SoftBox>
        <SoftBox>
          <SoftBox pl={0.5}>
            <SoftTypography variant="caption" fontWeight="regular" color="text">
              Ingresá el precio total en cuotas
            </SoftTypography>
          </SoftBox>
          <SoftInput
            placeholder="16000"
            icon={{
              component: "credit_card",
              direction: "right",
            }}
          />
        </SoftBox>
        <SoftBox>
          <SoftBox pl={0.5}>
            <SoftTypography variant="caption" fontWeight="regular" color="text">
              Inflación mensual estimada
            </SoftTypography>
          </SoftBox>

          <SoftInput
            placeholder="8.4"
            icon={{
              component: "request_quote",
              direction: "right",
            }}
          />
        </SoftBox>
        <SoftBox>
          <SoftBox pl={0.5}>
            <SoftTypography variant="caption" fontWeight="regular" color="text">
              Cantidad de cuotas
            </SoftTypography>
          </SoftBox>
          <SoftInput
            placeholder="12"
            icon={{
              component: "payments",
              direction: "right",
            }}
          />
        </SoftBox>

        <SoftButton variant="contained" color="dark" fullWidth>
          Calcular
        </SoftButton>
      </SoftBox>
    </Card>
  );
};

export default Infleta;
