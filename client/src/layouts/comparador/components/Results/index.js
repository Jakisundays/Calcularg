import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Box, Card, Grid, Icon, IconButton } from "@mui/material";
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import MasterCard from "examples/Cards/MasterCard";
import OutlinedCounterCard from "examples/Cards/CounterCards/OutlinedCounterCard";
import ResultsInfoCard from "examples/Cards/InfoCards/ResultsInfoCard";
import {
  calcularValorCuota,
  calcularTasaRecargo,
  calcularInversion,
  agregarEspacios,
} from "utils/calculadora";
import CashInvoice from "../CashInvoice";
import Efectivo from "../Efectivo";
import ComoFunciona from "../ComoFunciona";
import SoftButton from "components/SoftButton";
import CuotasOverview from "../CuotasOverview";

import proceda from "../../../../assets/images/proceda.webp";

const Results = ({ contado, cuotas, inflacion, cantidadCuotas, restart }) => {
  const [cuotasArray, setCuotasArray] = useState([]);
  const [sumatoria, setSumatoria] = useState(0);

  useEffect(() => {
    setCuotasArray(calcularValorCuota(cuotas, inflacion, cantidadCuotas));
  }, [cuotas, inflacion, cantidadCuotas]);

  useEffect(() => {
    setSumatoria(
      Math.ceil(cuotasArray.reduce((accumulator, currentValue) => accumulator + currentValue, 0))
    );
  }, [cuotasArray]);

  const isMejorOpcionContado = contado > sumatoria;

  return (
    <SoftBox py={3} id="results">
      <Grid container spacing={2} mb={3}>
        {/* MejorOpcion */}
        <Grid item xs={12} md={9} lg={7.6} xl={7.6}>
          <SoftBox
            color="white"
            bgColor="dark"
            variant="gradient"
            borderRadius="lg"
            shadow="lg"
            opacity={1}
          >
            <SoftTypography variant="h3" align="center" padding={2} color="white">
              {isMejorOpcionContado
                ? "Tu mejor opción es comprar en Cuotas 💳"
                : "Tu mejor opción es comprar de Contado 💰"}
            </SoftTypography>
          </SoftBox>
        </Grid>
        {/* sumatoria */}
        <Grid item xs={12} md={3} lg={4.4} xl={4.4}>
          <OutlinedCounterCard
            count={sumatoria}
            prefix="$"
            title="Sumatoria de las cuotas ajustadas a valor de hoy"
            pad={0.5}
            color="dark"
            cap={false}
          />
        </Grid>
      </Grid>
      <Grid container spacing={3} mb={3}>
        {/* info */}
        <Grid item xs={12} md={7} lg={7} xl={7.2}>
          <Card sx={{ height: "100%", boxShadow: "0px 0px 9px -5px rgba(0,0,0,0.75)" }}>
            <SoftBox
              pt={1}
              px={2}
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <SoftTypography variant="h5" fontWeight="bold">
                Transaccion
              </SoftTypography>
            </SoftBox>
            <SoftBox p={2}>
              <SoftBox component="ul" display="flex" flexDirection="column" p={0} m={0}>
                <CashInvoice date="Precio de contado" price={`$ ${agregarEspacios(contado)}`} />
                <CashInvoice date="Precio total en cuotas" price={`$ ${agregarEspacios(cuotas)}`} />
                <CashInvoice date="Inflación mensual estimada" price={`${inflacion} %`} />
                <CashInvoice
                  date="Cantidad de cuotas"
                  price={cantidadCuotas === 1 ? "1 cuota" : `${cantidadCuotas} cuotas`}
                  noGutter
                />
              </SoftBox>
            </SoftBox>
          </Card>
        </Grid>
        {/* card */}
        <Grid item xs={12} md={5} lg={5} xl={4.8}>
          {isMejorOpcionContado ? (
            <MasterCard number={4562112245947852} holder="Leo Messi" expires="11/27" color="dark" />
          ) : (
            <Card
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "225px",
                width: "auto",
                position: "relative",
                boxShadow: "0px 0px 9px -5px rgba(0,0,0,0.75)",
              }}
            >
              <SoftBox
                borderRadius="lg"
                component="img"
                src={proceda}
                alt="proceda"
                width="100%"
                height="100%"
                shadow="lg"
              />
            </Card>
          )}
        </Grid>
        {/* info */}
        <Grid item xs={6} md={6} lg={6} xl={6}>
          <ResultsInfoCard
            icon="account_balance"
            title="Tasa de recargo"
            description="Ajustando el costo con cuotas e inflación."
            value={`${calcularTasaRecargo(contado, cuotas)} %`}
          />
        </Grid>
        {/* info */}
        <Grid item xs={6} md={6} lg={6} xl={6}>
          <ResultsInfoCard
            icon="payment"
            title="Cuota mensual"
            description="Suscripción financiera, estilo moderno."
            value={`$ ${Math.round(cuotas / cantidadCuotas)}`}
          />
        </Grid>
        {/* cuotas */}
        <Grid item xs={12} md={12} lg={12} xl={12}>
          <CuotasOverview cuotasVisuales={cuotasArray} />
        </Grid>
      </Grid>
      <Grid container spacing={5} mb={3}>
        <Grid item xs={12} md={12} lg={7} xl={8}>
          <Efectivo
            mp={calcularInversion(
              contado,
              0.8,
              cantidadCuotas,
              Math.round(cuotas / cantidadCuotas)
            )}
            pf={calcularInversion(
              contado,
              0.97,
              cantidadCuotas,
              Math.round(cuotas / cantidadCuotas)
            )}
          />
        </Grid>
        <Grid item xs={12} md={12} lg={5} xl={4}>
          <Box display="flex" flexDirection="column" alignItems="center" height="100%" gap={3}>
            <ComoFunciona />
            <SoftButton variant="gradient" color="info" onClick={restart}>
              <Icon fontSize="large" sx={{ fontWeight: "bold" }}>
                restart_alt
              </Icon>
              &nbsp; Comienza de nuevo.
            </SoftButton>
          </Box>
        </Grid>
      </Grid>
    </SoftBox>
  );
};

Results.propTypes = {
  contado: PropTypes.number,
  cuotas: PropTypes.number,
  inflacion: PropTypes.number,
  cantidadCuotas: PropTypes.number,
  restart: PropTypes.func,
};

export default Results;
