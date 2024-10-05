export const formatNumberToPrice = (
  number: string | number,
  currency = ""
): string => {
  // return number.toString();
  // Convertimos el número a una cadena para manipular los caracteres
  let numberStr = number.toString();

  numberStr = numberStr.replaceAll(".", "").replace(",", ".");

  // Separamos la parte entera y decimal
  const partes = numberStr.split(".");
  const parteEntera = partes[0];
  const parteDecimal = partes.length > 1 ? "," + partes[1] : "";

  // Agregamos puntos como separadores de miles en la parte entera
  const parteEnteraFormateada = parteEntera.replace(
    /\B(?=(\d{3})+(?!\d))/g,
    "."
  );

  // Combinamos ambas partes
  const final = parteEnteraFormateada + parteDecimal + ` ${currency}`;

  return final === "0" ? "" : final;
};
