import DefaultLineChart from "examples/Charts/LineCharts/DefaultLineChart";
import React, { useEffect, useState } from "react";

const InflacionChart = () => {
  const [labels, setLabels] = useState([]);
  const [data, setData] = useState([]);
  useEffect(() => {
    const getInflacion = async () => {
      try {
        const response = await fetch(
          "https://api.estadisticasbcra.com/inflacion_interanual_oficial",
          {
            method: "GET",
            headers: {
              Authorization:
                "Bearer eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3MTc4NzYxNTgsInR5cGUiOiJleHRlcm5hbCIsInVzZXIiOiJqYWNvYmd1aWxsZXJtb29vQGdtYWlsLmNvbSJ9.pCo-OfwC99B_FrGBjRhKZPVykD1X2N7tpPFqqlqaXAoBNRatnQWiHbJZ_a-Ta5aNXczyIkrQfvl-YfzZxYk24Q",
            },
          }
        );
        console.log({ response });
        const jsonData = await response.json();
        // setLabels(jsonData.map((data) => data.d));
        // setData(jsonData.map((data) => data.v));
      } catch (error) {
        console.error("Error al realizar la solicitud:", error);
      }
    };
    getInflacion();
  }, []);
  return (
    <DefaultLineChart
      title="Inflación Interanual (Oficial)"
      chart={{
        labels: labels,
        datasets: [
          {
            label: "Inflación",
            color: "info",
            data: data,
          },
        ],
      }}
    />
  );
};

export default InflacionChart;
