export const formatNumberToPrice = (numero: number): string => {
  // Convertimos el número a una cadena para manipular los caracteres
  const numeroStr = numero.toString();

  // Separamos la parte entera y decimal
  const partes = numeroStr.split(".");
  const parteEntera = partes[0];
  const parteDecimal = partes.length > 1 ? "," + partes[1] : "";

  // Agregamos puntos como separadores de miles en la parte entera
  const parteEnteraFormateada = parteEntera.replace(
    /\B(?=(\d{3})+(?!\d))/g,
    "."
  );

  // Combinamos ambas partes
  return parteEnteraFormateada + parteDecimal;
};
