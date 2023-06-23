// @mui material components
import Grid from "@mui/material/Grid";
import Icon from "@mui/material/Icon";
import Divider from "@mui/material/Divider";
import { Box, Card, IconButton, MenuItem, Select } from "@mui/material";
import { useEffect, useRef, useReducer } from "react";
import RestartAltIcon from "@mui/icons-material/RestartAlt";

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftInput from "components/SoftInput";
import SoftButton from "components/SoftButton";

// Soft UI Dashboard React examples
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import MiniStatisticsCard from "examples/Cards/StatisticsCards/MiniStatisticsCard";

// Dashboard layout components
import WorkWithTheRockets from "layouts/dashboard/components/WorkWithTheRockets";

// Data
import useInflacion from "hooks/useInflacion";
import Results from "./components/Results";

// utils
import { convertDate } from "../../utils/convertDate";

const initialState = {
  contado: "",
  cuotas: "",
  inflacion: "",
  cantidadCuotas: "",
  showResults: false,
  error: false,
  currentColor: "#3acaeb",
};

const reducer = (state, action) => {
  switch (action.type) {
    case "reset":
      return initialState;
    case "setField":
      return { ...state, [action.field]: action.value };
    case "setShowResults":
      return { ...state, showResults: action.value };
    case "setCurrentColor":
      return { ...state, currentColor: action.value };
    default:
      return state;
  }
};

const cantidadCuotasOptions = [3, 6, 9, 12, 18, 24, 30, 32, 36, 48];

const Comparador = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { contado, cuotas, inflacion, cantidadCuotas, showResults, currentColor } = state;
  const resultsRef = useRef(null);

  const { inflacionMensual, inflacionAnual } = useInflacion();

  useEffect(() => {
    if (showResults) {
      setTimeout(() => {
        resultsRef.current.scrollIntoView({ behavior: "smooth" });
      }, 100);
    }
  }, [showResults]);

  useEffect(() => {
    const interval = setInterval(() => {
      dispatch({
        type: "setCurrentColor",
        value: currentColor === "#3acaeb" ? "#17c1e8" : "#3acaeb",
      });
    }, 2000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  const restart = () => {
    dispatch({ type: "reset" });
  };

  const handleInputChange = (field, value) => {
    dispatch({ type: "setField", field, value });
  };

  const handleResults = () => {
    dispatch({ type: "setShowResults", value: true });
  };

  const isValidForm =
    contado === "" ||
    cuotas === "" ||
    inflacion === "" ||
    cantidadCuotas === "" ||
    inflacion > 10 ||
    inflacion < 0;

  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <SoftBox py={3}>
        <Grid container spacing={3} mb={8}>
          <Grid item xs={12} sm={12} md={7} lg={7} xl={8}>
            <Card sx={{ boxShadow: "0px 0px 9px -5px rgba(0,0,0,0.75)" }}>
              <SoftBox display="flex" justifyContent="space-between" alignItems="center" p={2}>
                <SoftBox>
                  <SoftTypography variant="h4" gutterBottom>
                    ¿Cuotas o Contado?
                  </SoftTypography>
                  <SoftBox display="flex" gap={0.7} alignItems="center">
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
                    <SoftTypography variant="body2" fontWeight="regular" color="text">
                      <strong> Mejora tu estrategia de pagos: </strong>calcula si te conviene cuotas
                      o pago único.
                    </SoftTypography>
                  </SoftBox>
                </SoftBox>
                <IconButton aria-label="restart" color="secondary" size="large" onClick={restart}>
                  <RestartAltIcon />
                </IconButton>
              </SoftBox>

              <SoftBox
                component="form"
                role="form"
                display="flex"
                flexDirection="column"
                justifyContent="space-around"
                gap={2.6}
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
                    type="number"
                    placeholder="10000"
                    icon={{
                      component: "attach_money",
                      direction: "right",
                    }}
                    value={contado}
                    success={contado > 0}
                    onChange={(e) => handleInputChange("contado", e.target.value)}
                  />
                </SoftBox>
                <SoftBox>
                  <SoftBox pl={0.5}>
                    <SoftTypography variant="caption" fontWeight="regular" color="text">
                      Ingresá el precio total en cuotas
                    </SoftTypography>
                  </SoftBox>
                  <SoftInput
                    type="number"
                    placeholder="16000"
                    icon={{
                      component: "credit_card",
                      direction: "right",
                    }}
                    value={cuotas}
                    success={cuotas > 0}
                    onChange={(e) => handleInputChange("cuotas", e.target.value)}
                  />
                </SoftBox>
                <SoftBox>
                  <SoftBox pl={0.5}>
                    <SoftTypography variant="caption" fontWeight="regular" color="text">
                      Inflación mensual estimada
                    </SoftTypography>
                  </SoftBox>

                  <SoftInput
                    type="number"
                    placeholder={
                      inflacionMensual.valor
                        ? `${inflacionMensual.valor}% (valor debe ser menor o igual a 10)`
                        : "8.5%"
                    }
                    icon={{
                      component: "request_quote",
                      direction: "right",
                    }}
                    value={inflacion}
                    success={inflacion > 0 && inflacion <= 10}
                    error={inflacion > 10 || inflacion < 0}
                    onChange={(e) => handleInputChange("inflacion", e.target.value)}
                  />
                </SoftBox>
                <SoftBox>
                  <SoftBox pl={0.5}>
                    <SoftTypography variant="caption" fontWeight="regular" color="text">
                      Cantidad de cuotas
                    </SoftTypography>
                  </SoftBox>
                  <Select
                    value={cantidadCuotas}
                    displayEmpty
                    inputProps={{ "aria-label": "Without label" }}
                    MenuProps={MenuProps}
                    onChange={(e) => handleInputChange("cantidadCuotas", e.target.value)}
                  >
                    <MenuItem disable value="">
                      <p style={{ opacity: ".5" }}>Selecciona la cantidad de cuotas</p>
                    </MenuItem>
                    <MenuItem value={1}>1 cuota</MenuItem>
                    {cantidadCuotasOptions.map((option, i) => (
                      <MenuItem key={i} value={option}>{`${option} cuotas`}</MenuItem>
                    ))}
                  </Select>
                </SoftBox>

                <SoftButton
                  variant="contained"
                  color="dark"
                  onClick={handleResults}
                  fullWidth
                  disabled={isValidForm}
                >
                  {isValidForm ? "Completa todo los campos" : "Calcular"}
                </SoftButton>
              </SoftBox>
            </Card>
          </Grid>
          <Grid item xs={12} sm={12} md={5} lg={5} xl={4}>
            <Box
              display="flex"
              flexDirection="column"
              justifyContent="space-between"
              height="100%"
              gap={1.5}
            >
              <MiniStatisticsCard
                title={{ text: "Inflación mensual oficial" }}
                count={inflacionMensual.valor ? `${inflacionMensual.valor}%` : "8.5%"}
                bgColor="dark"
                percentage={{
                  color: "success",
                  text: inflacionMensual.fecha && `${convertDate(inflacionMensual.fecha)}`,
                }}
                icon={{ color: "info", component: "data_thresholding" }}
              />
              <MiniStatisticsCard
                title={{ text: "Inflación esperada oficial" }}
                count={inflacionAnual.valor ? `${inflacionAnual.valor}%` : "171.2%"}
                bgColor="dark"
                percentage={{
                  color: "success",
                  text: inflacionAnual.fecha && `${convertDate(inflacionAnual.fecha)}`,
                }}
                icon={{ color: "info", component: "query_stats" }}
              />
              <WorkWithTheRockets
                titulo="Actualidad Financiera"
                altura="60%"
                desc="Mejoramos tu experiencia financiera con datos actualizados del Banco Central de la República Argentina para un servicio moderno y sencillo."
              />
            </Box>
          </Grid>
        </Grid>

        <Divider />
      </SoftBox>

      <div
        ref={resultsRef}
        id="results"
        style={{
          display: showResults ? "block" : "none",
        }}
      >
        <Results
          contado={Number(contado)}
          cuotas={Number(cuotas)}
          inflacion={Number(inflacion)}
          cantidadCuotas={Number(cantidadCuotas)}
          restart={restart}
        />
        <Divider />
      </div>

      <Footer />
    </DashboardLayout>
  );
};

export default Comparador;
