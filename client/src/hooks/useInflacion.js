import { useState, useEffect } from "react";

const useInflacion = () => {
  const [inflacionMensual, setInflacionMensual] = useState({});
  const [inflacionAnual, setInflacionAnual] = useState({});

  useEffect(() => {
    const fetchData = async () => {

      try {
        const responseMensual = await fetch(`${process.env.REACT_APP_SERVER_URL}/api/brca/inflacion_mensual`);
        const dataMensual = await responseMensual.json();
        // console.log(dataMensual);
        setInflacionMensual(dataMensual);

        const responseAnual = await fetch(`${process.env.REACT_APP_SERVER_URL}/api/brca/inflacion_anual`);
        const dataAnual = await responseAnual.json();
        // console.log(dataAnual);
        setInflacionAnual(dataAnual);
      } catch (error) {
        console.log("Error al obtener los datos de inflación:", { error });
      }
    };

    fetchData();
  }, []);

  return { inflacionMensual, inflacionAnual };
};

export default useInflacion;
