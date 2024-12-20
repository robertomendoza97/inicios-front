export const formatNumberToPrice = (
  number: string | number,
  currency = ""
): string => {
  // Convertimos el número a una cadena para manipular los caracteres
  let numberStr = number.toString();

  if (typeof number === "string") {
    numberStr = numberStr.replaceAll(".", "").replace(",", ".");
  }

  // Separamos la parte entera y decimal
  const parts = numberStr.split(".");
  const entirePart = Number(parts[0]).toString();

  const decimalPart = parts.length > 1 ? "," + parts[1] : "";

  // Agregamos puntos como separadores de miles en la parte entera
  const formattedEntiredPart = entirePart.replace(/\B(?=(\d{3})+(?!\d))/g, ".");

  // Combinamos ambas partes
  const final = formattedEntiredPart + decimalPart;

  return final === "0" ? "" : currency ? `${final} ${currency}` : final;
};
