const calcularPorcentajeCambio = (valorVentaActual, nuevoValorVenta) => {
  const diferencia = nuevoValorVenta - valorVentaActual;
  const porcentajeCambio = (diferencia / valorVentaActual) * 100;
  return porcentajeCambio;
};

module.exports = { calcularPorcentajeCambio};