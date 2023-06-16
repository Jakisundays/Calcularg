export const obtenerSumatoriaCuotasAjustadas = (
  precioContado,
  precioTotalCuotas,
  inflacionMensual,
  cantidadCuotas
) => {
  const factorAjusteMensual = 1 + inflacionMensual / 100;
  const factorAjusteTotal = Math.pow(factorAjusteMensual, cantidadCuotas);
  const valorCuotaAjustada = precioTotalCuotas / factorAjusteTotal;
  const sumatoriaCuotasAjustadas = valorCuotaAjustada * cantidadCuotas;
  // console.log({sumatoriaCuotasAjustadas})
  return sumatoriaCuotasAjustadas;
};

export const calcularValorCuota = (cuotas, inflacion, cantidadCuotas) => {
  let cuotasAjustadas = [];
  const marcela = cuotas / cantidadCuotas;

  // const marcela = contado / cantidadCuotas;

  for (let i = 1; i <= cantidadCuotas; i++) {
    const factorAjuste = 1 + inflacion / 100;
    const cuotaAjustada = marcela / Math.pow(factorAjuste, i);
    cuotasAjustadas.push(cuotaAjustada);
  }

  return cuotasAjustadas;
};

export const calcularTasaRecargo = (contado, totalCuotas) => {
  const numerador = (totalCuotas - contado) / contado;
  return numerador * 100;
};
