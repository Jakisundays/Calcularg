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
  const tasaRecargo = numerador * 100;
  return Number.isInteger(tasaRecargo) ? tasaRecargo.toFixed(0) : tasaRecargo.toFixed(2);
};

export const agregarEspacios = (numero) => {
  const numeroString = numero.toString(); // Convertir el número a una cadena de texto
  let resultado = "";

  for (let i = numeroString.length - 1; i >= 0; i--) {
    resultado = numeroString.charAt(i) + resultado;

    // Agregar un espacio cada tres dígitos, excepto al principio del número
    if ((numeroString.length - i) % 3 === 0 && i !== 0) {
      resultado = " " + resultado;
    }
  }

  return resultado;
};

export const calcularInversion = (contado, porcentaje, cantidadCuotas, monto) => {
  const interestRate = porcentaje / 12;
  const adjustedRate = 1 + interestRate;

  
  let inversionAnual = contado * Math.pow(adjustedRate, cantidadCuotas);
  
  let inversionAnualMenosCuotas = contado;
  for (let i = 0; i < cantidadCuotas; i++) {
    inversionAnualMenosCuotas = (inversionAnualMenosCuotas * adjustedRate) - monto;
  }
  
  return {
    inversionAnual: Math.round(inversionAnual),
    inversionAnualMenosCuotas: Math.round(inversionAnualMenosCuotas)
  };
};


