import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import React, { useEffect, useState } from "react";
import { Alert, CircularProgress, Divider, Grid, LinearProgress } from "@mui/material";

import DolarHoy from "./components/DolarHoy";
import Cuanto from "./components/Cuanto";
import SoftBox from "components/SoftBox";
import Footer from "examples/Footer";

const Dolargento = () => {
  const [dolares, setDolares] = useState([]);
  const [euros, setEuros] = useState([]);
  const [reales, setReales] = useState([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    const obtenerDatos = async () => {
      try {
        const [dolarRes, euroRes, realRes1, realRes2] = await Promise.all([
          fetch(`${process.env.REACT_APP_SERVER_URL}/api/dolar`),
          fetch("https://api.bluelytics.com.ar/v2/latest"),
          fetch(`${process.env.REACT_APP_SERVER_URL}/api/real/oficial`),
          fetch(`${process.env.REACT_APP_SERVER_URL}/api/real/blue`),
          ,
        ]);

        const [dolarData, euroData, realData1, realData2] = await Promise.all([
          dolarRes.json(),
          euroRes.json(),
          realRes1.json(),
          realRes2.json(),
        ]);

        setDolares(dolarData);
        setEuros(euroData);

        const reales = [
          { ...realData1, currency: "Real Oficial" },
          { ...realData2, currency: "Real Blue" },
        ];
        setReales(reales);
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

  const parseNumber = (str) => {
    const cleanedStr = str.replace(",", ".");
    return +cleanedStr;
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <Grid container spacing={3} sx={{ overflow: "hidden" }}>
        <Grid item xs={12} xl={12}>
          <DolarHoy />
          <Divider />
        </Grid>
      </Grid>

      {dolares.oficial ? (
        <Grid container spacing={3}>
          <Grid item xs={12} md={4} lg={3} xl={3}>
            <Cuanto
              title={"Dolar Oficial"}
              fecha={dolares.oficial.date}
              buy={parseNumber(dolares.oficial.buy)}
              sell={parseNumber(dolares.oficial.sell)}
              variation={parseNumber(dolares.oficial.variation)}
              info={
                "El dólar oficial o minorista es el precio al que pueden acceder los particulares."
              }
              spread={dolares.oficial.spread}
            />
          </Grid>
          <Grid item xs={12} md={4} lg={3} xl={3}>
            <Cuanto
              title={"Dolar Blue"}
              fecha={dolares.informal.date}
              buy={parseNumber(dolares.informal.buy)}
              sell={parseNumber(dolares.informal.sell)}
              variation={parseNumber(dolares.informal.variation)}
              info={`Se refiere al fenómeno del "dólar ilegal", que es comercializado de forma directa entre individuos privados, a través de canales informales como las "cuevas" o los vendedores callejeros, conocidos en nuestro país como "arbolitos".`}
              spread={dolares.informal.spread}
            />
          </Grid>
          <Grid item xs={12} md={4} lg={3} xl={3}>
            <Cuanto
              title={dolares.tarjeta.name}
              fecha={dolares.tarjeta.date}
              buy={parseNumber(dolares.tarjeta.buy)}
              sell={parseNumber(dolares.tarjeta.sell)}
              variation={parseNumber(dolares.tarjeta.variation)}
              info={
                "El dólar turista o dólar tarjeta es el mismo dólar que se utiliza para hacer compras en el extranjero o contratar servicios dolarizados como Netflix o Spotify. La diferencia con el dólar ahorro o solidario son las restricciones: no todas las personas pueden comprar dólares para ahorrar, pero sí pueden usar sus tarjetas para comprar bienes o servicios dolarizados al tipo de cambio oficial más impuestos (30% PAIS + 45% adelanto de ganancias). Esta tasa de impuestos del 75% se aplica solo a consumos acumulados inferiores a los U$S 300."
              }
              spread={dolares.tarjeta.spread}
            />
          </Grid>
          <Grid item xs={12} md={4} lg={3} xl={3}>
            <Cuanto
              title={dolares.qatar.name}
              fecha={dolares.qatar.date}
              buy={parseNumber(dolares.qatar.buy)}
              sell={parseNumber(dolares.qatar.sell)}
              variation={parseNumber(dolares.qatar.variation)}
              info={`El "dólar Qatar" es un nuevo tipo de cambio para compras en moneda extranjera con tarjeta de crédito y débito que superen los u$s300 al mes. Este tipo de cambio incluye un 100% de impuestos, que se divide en 30% PAIS, 45% adelanto de ganancias y 25% adelanto de bienes personales.`}
              spread={dolares.qatar.spread}
            />
          </Grid>
          <Grid item xs={12} md={4} lg={3} xl={3}>
            <Cuanto
              title={dolares.ahorro.name}
              fecha={dolares.ahorro.date}
              buy={parseNumber(dolares.ahorro.buy)}
              sell={parseNumber(dolares.ahorro.sell)}
              variation={parseNumber(dolares.ahorro.variation)}
              spread={dolares.ahorro.spread}
              info={`"Dólar ahorro" o "dólar solidario" es el término para el dólar con un impuesto del 30%. "Dólar turista" o "dólar tarjeta" también tiene impuestos (30% PAIS + 35% adelanto de ganancias). `}
            />
          </Grid>
          <Grid item xs={12} md={4} lg={3} xl={3}>
            <Cuanto
              title={dolares.mayorista.name}
              fecha={dolares.mayorista.date}
              buy={parseNumber(dolares.mayorista.buy)}
              sell={parseNumber(dolares.mayorista.sell)}
              spread={dolares.mayorista.spread}
              variation={parseNumber(dolares.mayorista.variation)}
              info={
                "El mercado mayorista es donde el Banco Central compra o vende dólares y donde operan los bancos y casas de cambio autorizadas. El dólar mayorista es más barato que el dólar minorista porque los bancos ganan dinero al ofrecer un precio más alto a las personas que el que pagaron por los dólares."
              }
            />
          </Grid>
          <Grid item xs={12} md={4} lg={3} xl={3}>
            <Cuanto
              title={dolares.cripto.name}
              fecha={dolares.cripto.date}
              buy={parseNumber(dolares.cripto.buy)}
              sell={parseNumber(dolares.cripto.sell)}
              variation={parseNumber(dolares.cripto.variation)}
              info={
                "El dólar cripto son monedas estables que están vinculadas al dólar estadounidense. Su valor se mantiene igual al dólar y se pueden operar las 24 horas del día, los 7 días de la semana. Las tres más populares son Tether (USDT), USD Coin (USDC) y Dai (DAI). Estas monedas buscan mantener una paridad de 1 a 1 con el dólar y pueden estar respaldadas por activos financieros, otros criptoactivos o materias primas."
              }
              spread={dolares.cripto.spread}
            />
          </Grid>
          <Grid item xs={12} md={4} lg={3} xl={3}>
            <Cuanto
              title={dolares.netflix.name}
              fecha={dolares.netflix.date}
              sell={parseNumber(dolares.netflix.sell)}
              variation={parseNumber(dolares.netflix.variation)}
              info={
                "El dólar Netflix o streaming es utilizado por plataformas como Netflix, Spotify, etc. Tiene un 8% de impuesto PAIS, un 21% de IVA y un 45% a cuenta de Ganancias, lo que resulta en un recargo total del 74% en comparación con el dólar minorista."
              }
              spread={dolares.netflix.spread}
            />
          </Grid>
          <Grid item xs={12} md={4} lg={3} xl={3}>
            <Cuanto
              title={dolares.mep.name}
              fecha={dolares.mep.date}
              sell={parseNumber(dolares.mep.sell)}
              variation={parseNumber(dolares.mep.variation)}
              info={`El "dólar bolsa" o "dólar MEP" es una operación legal en Argentina que se parece al "contado con liqui". Consiste en comprar bonos que cotizan tanto en pesos como en dólares en el mercado local y luego venderlos en dólares a través de un agente de bolsa. No necesitas tener una cuenta en el exterior para hacerlo, pero sí una cuenta de inversión en el país.`}
              spread={dolares.mep.spread}
            />
          </Grid>
          <Grid item xs={12} md={4} lg={3} xl={3}>
            <Cuanto
              title={"Dolares ledes Mep"}
              fecha={dolares.ledesMep.date}
              sell={parseNumber(dolares.ledesMep.sell)}
              variation={parseNumber(dolares.ledesMep.variation)}
              info={
                "El valor se calcula comparando el precio de letras en pesos con el precio de la misma letra en dólares en el mercado. La referencia contiene las letras que se utilizan."
              }
              spread={dolares.ledesMep.spread}
            />
          </Grid>
          <Grid item xs={12} md={4} lg={3} xl={3}>
            <Cuanto
              title={"Dolar CCL"}
              fecha={dolares.ccl.date}
              sell={parseNumber(dolares.ccl.sell)}
              spread={dolares.ccl.spread}
              variation={parseNumber(dolares.ccl.variation)}
              info={`El CCL o "dólar cable" es un tipo de dólar bursátil que se utiliza para operar bonos, acciones o CEDEARs. A diferencia del dólar MEP, el CCL requiere un paso adicional fuera de la bolsa local, realizándose en una cuenta del exterior. Su valor se calcula comparando el precio de un bono en pesos con el mismo bono en dólares cable, usando bonos específicos como referencia. Todas las operaciones pueden realizarse en línea.`}
            />
          </Grid>
          <Grid item xs={12} md={4} lg={3} xl={3}>
            <Cuanto
              title={"Dolares ledes CCL"}
              fecha={dolares.ledesMep.date}
              sell={parseNumber(dolares.ledesMep.sell)}
              spread={dolares.ledesMep.spread}
              variation={parseNumber(dolares.ledesMep.variation)}
              info={
                "El valor se determina comparando el precio de las letras en pesos con su precio en dólares cable, según una lista específica de letras utilizadas."
              }
            />
          </Grid>
          {euros && (
            <>
              <Grid item xs={12} md={4} lg={3} xl={3}>
                <Cuanto
                  title={"euro oficial"}
                  sell={euros.oficial_euro.value_sell}
                  buy={euros.oficial_euro.value_buy}
                  spread={euros.last_update}
                  euro
                  info={
                    "Tipo de cambio oficial establecido por las autoridades monetarias de un país. Es el valor al que se intercambia la moneda nacional por euros según la tasa oficial determinada por el gobierno."
                  }
                />
              </Grid>
              <Grid item xs={12} md={4} lg={3} xl={3}>
                <Cuanto
                  title={"euro blue"}
                  sell={euros.blue_euro.value_sell}
                  buy={euros.blue_euro.value_buy}
                  euro
                  spread={euros.last_update}
                  info={
                    "El Euro Blue es el tipo de cambio no oficial del euro en el mercado negro, determinado por la oferta y la demanda fuera del sistema financiero regulado."
                  }
                />
              </Grid>
            </>
          )}

          {reales &&
            reales?.map((real, i) => (
              <Grid key={i} item xs={12} md={4} lg={3} xl={3}>
                <Cuanto
                  title={real.currency}
                  real
                  sell={real.venta}
                  buy={real.compra}
                  spread={real.fecha}
                  info={
                    real.currency === "Real Oficial"
                      ? " Es el tipo de cambio al cual se realizan las transacciones oficiales, como importaciones, exportaciones y operaciones financieras reguladas."
                      : "Real blue en Argentina se refiere al tipo de cambio no oficial y más alto que se utiliza en el mercado negro de divisas para transacciones ilegales o no reguladas."
                  }
                />
              </Grid>
            ))}
        </Grid>
      ) : error ? (
        <SoftBox
          sx={{ width: "100%", display: "flex", justifyContent: "center", alignItems: "center" }}
        >
          <Alert variant="filled" severity="error">
            Lo sentimos, no fue posible obtener los datos en este momento. Por favor, inténtalo de
            nuevo más tarde.
          </Alert>
        </SoftBox>
      ) : (
        <SoftBox
          sx={{ width: "100%", display: "flex", justifyContent: "center", alignItems: "center" }}
        >
          <CircularProgress color="dark" />
        </SoftBox>
      )}
      <Divider />
      {dolares.oficial && <Footer />}
    </DashboardLayout>
  );
};

export default Dolargento;
