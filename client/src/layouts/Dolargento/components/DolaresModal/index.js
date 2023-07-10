import { Button, ButtonGroup, Divider, IconButton, Modal, useMediaQuery } from "@mui/material";
import SoftBox from "components/SoftBox";
import SoftInput from "components/SoftInput";
import SoftTypography from "components/SoftTypography";
import PropTypes from "prop-types";
import React, { useEffect } from "react";
import { useState } from "react";
import { calcularHorasPasadas } from "utils/convertDate";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";

const DolaresModal = ({ open, setOpen, title, buy, sell, fecha, spread, euro, real }) => {
  const [currency, setCurrency] = useState("USD");
  const [option, setOption] = useState(buy ? "compra" : "venta");
  const [cantidadUSD, setCantidadUSD] = useState(1);
  const [cantidadARS, setCantidadARS] = useState(500);
  const isSmallScreen = useMediaQuery("(max-width: 425px)");

  useEffect(() => {
    setCantidadARS(option === "compra" ? buy : sell);
  }, [option]);

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: isSmallScreen ? "97%" : "auto",
  };
  const calculateConvertedAmountUSD = () => {
    const amount = currency === "ARS" ? cantidadARS : cantidadUSD;
    const rate = option === "compra" ? buy : sell;

    const convertedAmount = rate * amount;
    const formattedAmount =
      convertedAmount === 0 || convertedAmount === ""
        ? rate.toFixed(2)
        : convertedAmount.toFixed(2);

    return formattedAmount;
  };

  const convertirFecha = (fechaISO) => {
    const fecha = new Date(fechaISO);
    const opcionesFecha = { year: "numeric", month: "long", day: "numeric" };
    const opcionesHora = { hour: "numeric", minute: "numeric", second: "numeric" };

    const fechaActualizacion = `Actualizado el: ${fecha.toLocaleDateString(
      "es-ES",
      opcionesFecha
    )} a las ${fecha.toLocaleTimeString("es-ES", opcionesHora)}`;

    return fechaActualizacion;
  };

  return (
    <Modal open={open} onClose={() => setOpen(false)}>
      <SoftBox
        borderRadius="lg"
        shadow="lg"
        color="white"
        bgColor="dark"
        opacity={1}
        p={2}
        sx={style}
      >
        <SoftBox sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <SoftTypography variant={isSmallScreen ? "h5" : "h4"} color="white">
            Conversor de Monedas en Tiempo Real
          </SoftTypography>
          <IconButton aria-label="close" size="large" onClick={() => setOpen(false)}>
            <CloseRoundedIcon color="white" />
          </IconButton>
        </SoftBox>
        <Divider light />
        <SoftTypography variant="body2" color="white">
          Elige tu dirección de conversión, {euro ? "euros" : real ? "reales brasileños" : "dolares"} a pesos o al revés,
          selecciona la tasa de cambio que prefieras y simplemente introduce la cantidad a
          convertir.🔥💸
        </SoftTypography>
        <Divider variant="middle" />
        <SoftBox
          sx={{ display: "flex", justifyContent: "space-around", flexWrap: "wrap", gap: "1rem" }}
        >
          <ButtonGroup variant="outlined" aria-label="large button group">
            <Button
              onClick={() => setCurrency("USD")}
              variant={currency === "USD" ? "contained" : "outlined"}
              color="success"
            >
              Tengo {euro ? "Euros" : real ? "Reales" : "Dolares"}
            </Button>
            <Button
              onClick={() => setCurrency("ARS")}
              variant={currency === "ARS" ? "contained" : "outlined"}
              color="success"
            >
              Tengo Pesos
            </Button>
          </ButtonGroup>
          {buy ? (
            <ButtonGroup variant="outlined" aria-label="large button group">
              <Button
                onClick={() => setOption("compra")}
                variant={option === "compra" ? "contained" : "outlined"}
                color="success"
              >
                Quiero comprar
              </Button>
              <Button
                onClick={() => setOption("venta")}
                variant={option === "venta" ? "contained" : "outlined"}
                color="success"
              >
                Quiero vender
              </Button>
            </ButtonGroup>
          ) : (
            <Button
              onClick={() => setOption("venta")}
              variant={option === "venta" ? "contained" : "outlined"}
              color="success"
            >
              Quiero vender
            </Button>
          )}
        </SoftBox>
        <Divider variant="middle" />
        <SoftBox px={3} py={0.5}>
          <SoftInput
            placeholder={currency === "ARS" ? "Cantidad de Pesos" : `cantidad de ${euro ? "Euros" : real ? "Reales" : "Dolares"}`}
            type="number"
            icon={{
              component: "price_change",
              direction: "left",
            }}
            value={currency === "ARS" ? cantidadARS : cantidadUSD}
            onChange={
              currency === "ARS"
                ? (e) => setCantidadARS(e.target.value)
                : (e) => setCantidadUSD(e.target.value)
            }
          />
        </SoftBox>
        <SoftBox
          px={isSmallScreen ? 0 : 3}
          py={0.5}
          mx={isSmallScreen ? 0 : 3}
          my={1}
          color="white"
          borderRadius="md"
          sx={{ backgroundColor: "#00303F" }}
        >
          <SoftTypography variant={"subtitle2"} align="center" color="light">
            Tipo de cambio a utilizado ({title})
          </SoftTypography>

          {currency === "USD" ? (
            <SoftTypography variant="h3" align="center" color="light" sx={{ mt: 0.5 }}>
              <span style={{ color: "#79a471" }}>{euro ? "EUR" : real ? "BRL" : "USD"}</span>{" "}
              {cantidadUSD === 0 || cantidadUSD === "" ? 1 : cantidadUSD} ={" "}
              <span style={{ color: "#6CACE4" }}> ARS </span>
              {calculateConvertedAmountUSD()}
            </SoftTypography>
          ) : (
            <SoftTypography variant="h3" align="center" color="light" sx={{ mt: 0.5 }}>
              <span style={{ color: "#79a471" }}>ARS</span>{" "}
              {option === "compra" && (cantidadARS === 0 || cantidadARS === "")
                ? buy.toFixed(2)
                : option === "venta" && (cantidadARS === 0 || cantidadARS === "")
                ? sell.toFixed(2)
                : cantidadARS}{" "}
              = <span style={{ color: "#6CACE4" }}> {euro ? "EUR" : real ? "BRL" : "USD"} </span>
              {option === "compra"
                ? (cantidadARS / buy).toFixed(2)
                : (cantidadARS / sell).toFixed(2)}
            </SoftTypography>
          )}
        </SoftBox>
        <SoftBox
          sx={{
            display: "flex",
            justifyContent: "space-evenly",
            flexWrap: "wrap",
            alignItems: "center",
          }}
        >
          {euro || real ? (
            <SoftTypography variant="overline" color="white">
              {convertirFecha(spread)}
            </SoftTypography>
          ) : (
            <>
              <SoftTypography variant="overline" color="white">
                {calcularHorasPasadas(fecha)}
              </SoftTypography>
              <SoftTypography variant="overline" color="white">
                Spread: ${spread}
              </SoftTypography>
            </>
          )}
        </SoftBox>
      </SoftBox>
    </Modal>
  );
};

DolaresModal.propTypes = {
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  buy: PropTypes.number,
  sell: PropTypes.number.isRequired,
  fecha: PropTypes.string.isRequired,
  spread: PropTypes.string,
  euro: PropTypes.bool,
  real: PropTypes.bool,
};
export default DolaresModal;
