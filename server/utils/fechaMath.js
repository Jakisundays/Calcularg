const convertirFechaLocalAUTC = (fechaLocal) => {
  const fechaParts = fechaLocal.split(" ");
  const fecha = fechaParts[0].split("-");
  const hora = fechaParts[1].split(":");

  const anio = parseInt(fecha[0], 10);
  const mes = parseInt(fecha[1], 10) - 1;
  const dia = parseInt(fecha[2], 10);
  const horaNum = parseInt(hora[0], 10);
  const minutos = parseInt(hora[1], 10);
  const segundos = parseInt(hora[2], 10);

  const fechaUTC = new Date(
    Date.UTC(anio, mes, dia, horaNum, minutos + 53, segundos)
  );
  return fechaUTC.toISOString();
};

module.exports = { convertirFechaLocalAUTC };
