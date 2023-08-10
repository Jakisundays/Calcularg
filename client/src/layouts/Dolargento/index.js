import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import React, { useEffect, useState } from "react";
import { Box, CircularProgress, Divider, Grid, Tab, Tabs } from "@mui/material";

import DolarHoy from "./components/DolarHoy";
import Cuanto from "./components/Cuanto";
import SoftBox from "components/SoftBox";
import Footer from "examples/Footer";
import TabPanel from "./components/TabPanel";

const Dolargento = () => {
  const [dolares, setDolares] = useState([]);
  const [euros, setEuros] = useState([]);
  const [reales, setReales] = useState([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    const obtenerDatos = async () => {
      try {
        const [dolarRes, euroRes, realRes] = await Promise.all([
          fetch(`${process.env.REACT_APP_SERVER_URL}/api/dolar`),
          fetch(`${process.env.REACT_APP_SERVER_URL}/api/euro`),
          fetch(`${process.env.REACT_APP_SERVER_URL}/api/real`),
        ]);

        const [dolarData, euroData, realData] = await Promise.all([
          dolarRes.json(),
          euroRes.json(),
          realRes.json(),
        ]);

        console.log({ euroData });

        setDolares(dolarData);
        setEuros(euroData);
        setReales(realData);
      } catch (error) {
        console.log({ error });
        setError(true);
      }
    };

    const timeout = 5000;
    const timeoutPromise = new Promise((resolve) => setTimeout(resolve, timeout));

    Promise.race([obtenerDatos(), timeoutPromise]).catch(() => {
      setError(true);
    });
  }, []);

  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const parseNumber = (str) => {
    const cleanedStr = str.replace(",", ".");
    return +cleanedStr;
  };

  function a11yProps(index) {
    return {
      id: `full-width-tab-${index}`,
      "aria-controls": `full-width-tabpanel-${index}`,
    };
  }

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <Grid container spacing={3} sx={{ overflow: "hidden" }}>
        <Grid item xs={12} xl={12}>
          <DolarHoy />
          <Divider />
        </Grid>
      </Grid>

      <SoftBox borderRadius="lg" shadow="lg" opacity={1} p={1} sx={{ width: "100%" }}>
        <SoftBox p={1} sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
            variant="fullwidth"
            sx={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "space-evenly",
              alignItems: "center",
            }}
          >
            <Tab
              sx={{ fontSize: { xs: 12, sm: 18, md: 21, lg: 21, xl: 24 }, textAlign: "center" }}
              label="Dolares"
              {...a11yProps(0)}
            />
            <Tab
              sx={{ fontSize: { xs: 12, sm: 18, md: 21, lg: 21, xl: 24 }, textAlign: "center" }}
              label="Euros"
              {...a11yProps(1)}
            />
            <Tab
              sx={{ fontSize: { xs: 12, sm: 18, md: 21, lg: 21, xl: 24 }, textAlign: "center" }}
              label="Reales"
              {...a11yProps(2)}
            />
          </Tabs>
        </SoftBox>
        <TabPanel value={value} index={0}>
          <Grid container spacing={3} sx={{ padding: "1rem .7rem", width: "100%" }}>
            {dolares.length > 0 ? (
              <>
                {dolares.map((info) => (
                  <Grid item xs={12} md={4} lg={3} xl={3} key={info._id}>
                    <Cuanto
                      title={`dolar ${info.nombre}`}
                      fecha={info.fechaActualizacion}
                      buy={info.compra}
                      sell={info.venta}
                      variation={info.variacion}
                      info={info.info}
                      spread={"2021091"}
                    />
                  </Grid>
                ))}
                <Grid item xs={12} md={4} lg={3} xl={3}>
                  <Cuanto
                    title={"dolar qatar"}
                    fecha={dolares[0].fechaActualizacion}
                    buy={dolares[0].compra}
                    sell={dolares[0].venta * 2}
                    variation={dolares[0].variacion}
                    info={`El "dólar Qatar" es un nuevo tipo de cambio para compras en moneda extranjera con tarjeta de crédito y débito que superen los u$s300 al mes. Este tipo de cambio incluye un 100% de impuestos, que se divide en 30% PAIS, 45% adelanto de ganancias y 25% adelanto de bienes personales.`}
                    spread={"2021091"}
                  />
                </Grid>
                <Grid item xs={12} md={4} lg={3} xl={3}>
                  <Cuanto
                    title={"dolar ahorro"}
                    fecha={dolares[0].fechaActualizacion}
                    buy={dolares[0].compra}
                    sell={dolares[0].venta * 1.75}
                    variation={dolares[0].variacion}
                    info={`El dólar ahorro argentino se utiliza para adquirir dólares en bancos autorizados. Su precio es el del dólar oficial más un 75% extra, que comprende el impuesto PAIS (30%) y adelanto de ganancias por turismo y gastos con tarjeta en el exterior (45%). El "dólar Qatar" es otro tipo de cambio para compras en moneda extranjera con tarjeta, aplicando un 100% de impuestos divididos en 30% PAIS, 45% adelanto de ganancias y 25% adelanto de bienes personales.`}
                    spread={"2021091"}
                  />
                </Grid>
                <Grid item xs={12} md={4} lg={3} xl={3}>
                  <Cuanto
                    title={"dolar streaming"}
                    fecha={dolares[0].fechaActualizacion}
                    buy={dolares[0].compra}
                    sell={dolares[0].venta * 1.74}
                    variation={dolares[0].variacion}
                    info={
                      "El dólar Netflix o streaming es utilizado por plataformas como Netflix, Spotify, etc. Tiene un 8% de impuesto PAIS, un 21% de IVA y un 45% a cuenta de Ganancias, lo que resulta en un recargo total del 74% en comparación con el dólar minorista."
                    }
                    spread={"2021091"}
                  />
                </Grid>
              </>
            ) : (
              <SoftBox
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  width: "100%",
                  height: "10vh",
                  padding: "2rem 0 0 0",
                }}
              >
                <CircularProgress size={50} />
              </SoftBox>
            )}
          </Grid>
        </TabPanel>
        <TabPanel value={value} index={1}>
          <Grid container spacing={3} sx={{ padding: "1rem .7rem", width: "100%" }}>
            {euros.length > 0 ? (
              <>
                {euros.map(
                  ({ _id, nombre, fechaActualizacion, compra, venta, variacion, info }) => (
                    <Grid item xs={12} md={4} lg={3} xl={3} key={_id}>
                      <Cuanto
                        title={nombre}
                        fecha={fechaActualizacion}
                        buy={compra}
                        sell={venta}
                        variation={variacion}
                        info={info}
                        euro
                        spread={"2021091"}
                      />
                    </Grid>
                  )
                )}
                <Grid item xs={12} md={4} lg={3} xl={3}>
                  <Cuanto
                    title={"euro tarjeta"}
                    fecha={euros[0].fechaActualizacion}
                    buy={euros[0].compra}
                    sell={euros[0].venta * 1.75}
                    variation={euros[0].variacion}
                    info={
                      "El euro turista o euro tarjeta es la misma moneda que se utiliza para hacer compras en el extranjero o contratar servicios en euros. La diferencia con el euro ahorro o solidario son las restricciones: no todas las personas pueden adquirir euros para ahorrar, pero sí pueden usar sus tarjetas para comprar bienes o servicios en euros al tipo de cambio oficial más impuestos (30% PAIS + 45% adelanto de ganancias). Esta tasa de impuestos del 75% se aplica solo a consumos acumulados inferiores a los €300."
                    }
                    euro
                    spread={"2021091"}
                  />
                </Grid>
                <Grid item xs={12} md={4} lg={3} xl={3}>
                  <Cuanto
                    title={"euro qatar"}
                    fecha={euros[0].fechaActualizacion}
                    buy={euros[0].compra}
                    sell={euros[0].venta * 2}
                    variation={euros[0].variacion}
                    info={
                      "El 'euro Qatar' es un tipo de cambio aplicado a compras en moneda extranjera con tarjetas de crédito y débito que superen los €300 al mes. Este cambio incorpora un impuesto del 100%, distribuido en 30% para el país, 45% como adelanto de ganancias y 25% como adelanto de bienes personales."
                    }
                    euro
                    spread={"2021091"}
                  />
                </Grid>
              </>
            ) : (
              <SoftBox
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  width: "100%",
                  height: "10vh",
                  padding: "2rem 0 0 0",
                }}
              >
                <CircularProgress size={50} />
              </SoftBox>
            )}
          </Grid>
        </TabPanel>
        <TabPanel value={value} index={2}>
          <Grid container spacing={3} sx={{ padding: "1rem .7rem", width: "100%" }}>
            {reales.length > 0 ? (
              <>
                {reales.map(
                  ({ _id, nombre, fechaActualizacion, compra, venta, variacion, info }) => (
                    <Grid item xs={12} md={4} lg={3} xl={3} key={_id}>
                      <Cuanto
                        title={nombre}
                        fecha={fechaActualizacion}
                        buy={compra}
                        sell={venta}
                        variation={variacion}
                        info={info}
                        real
                        spread={"2021091"}
                      />
                    </Grid>
                  )
                )}
                <Grid item xs={12} md={4} lg={3} xl={3}>
                  <Cuanto
                    title={"real tarjeta"}
                    fecha={reales[0].fechaActualizacion}
                    buy={reales[0].compra}
                    sell={reales[0].venta * 1.75}
                    variation={reales[0].variacion}
                    info={
                      "El real turista o real tarjeta es la misma moneda que se utiliza para hacer compras en el extranjero o contratar servicios en reales. "
                    }
                    real
                    spread={"2021091"}
                  />
                </Grid>
                <Grid item xs={12} md={4} lg={3} xl={3}>
                  <Cuanto
                    title={"real qatar"}
                    fecha={reales[0].fechaActualizacion}
                    buy={reales[0].compra}
                    sell={reales[0].venta * 2}
                    variation={reales[0].variacion}
                    info={
                      "El 'real Qatar' es un tipo de cambio aplicado a compras en moneda extranjera con tarjetas de crédito y débito que superen los €300 al mes. Este cambio incorpora un impuesto del 100%, distribuido en 30% para el país, 45% como adelanto de ganancias y 25% como adelanto de bienes personales."
                    }
                    real
                    spread={"2021091"}
                  />
                </Grid>
              </>
            ) : (
              <SoftBox
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  width: "100%",
                  height: "10vh",
                  padding: "2rem 0 0 0",
                }}
              >
                <CircularProgress size={50} />
              </SoftBox>
            )}
          </Grid>
        </TabPanel>
        {/* <TabPanel value={value} index={3}>
          <Grid container spacing={3} sx={{ padding: "1rem .7rem", width: "100%" }}></Grid>
        </TabPanel> */}
      </SoftBox>
    </DashboardLayout>
  );
};

export default Dolargento;
