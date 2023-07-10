export const convertDate = (date) => {
  const parts = date.split("-");
  const [year, month, day] = parts;
  const formattedDate = `${day}/${month}/${year}`;
  return formattedDate;
};

const convertDateFormat = (originalDateStr) => {
  const [datePart, timePart] = originalDateStr.split(' - ');
  const [day, month, year] = datePart.split('-');
  const newDateStr = `${year}-${month}-${day}T${timePart}`;
  return newDateStr;
};

export const calcularHorasPasadas = (desde) => {
  const fechaHoraInicial = new Date(convertDateFormat(desde)); // Convert the date format
  const fechaHoraActual = new Date();
  const diferenciaMs = fechaHoraActual - fechaHoraInicial;

  const horasPasadas = Math.floor(diferenciaMs / (1000 * 60 * 60));
  const minutosPasados = Math.floor(diferenciaMs / (1000 * 60));

  if (horasPasadas >= 1) {
    return horasPasadas === 1
      ? "Actualizado hace 1 hora"
      : `Actualizado hace ${horasPasadas} horas`;
  } else {
    return minutosPasados <= 1
      ? "Actualizado hace 1 minuto"
      : `Actualizado hace ${minutosPasados} minutos`;
  }
};
