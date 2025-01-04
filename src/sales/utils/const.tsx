export const SALES_LABELS = {
  INVOICE: "Factura de venta",
  INTEREST: "Tasa de interes (Mensual)",
  FREQUENCY: "Frecuencia",
  INITIAL: "Inicial",
  CANCEL: "Cancelar",
  NEW: "Nuevo",
  SALE: "Vender",
  PRODUCTS: "Productos",
  QUOTES: "Cuotas",
  HERE_SEE_PRODUCTS: "Aqui veras los productos que selecciones.",
  HERE_SEE_QUOTES: "Aqui veras las cuotas de pago.",
  QUANTITY: "Cant:",
  NEW_PRODUCT: "Nuevo producto",
  PLACEHOLDERS: {
    SEARCH_PRODUCTS: "Buscar productos",
    CLIENT: "Cliente"
  },
  NOTIFICATIONS: {
    ERRORS: {
      CREATION: "Ocurrio un error al crear la venta."
    },
    CREATION: "Venta creada exitosamente."
  }
};

const WEEKLY_QUOTES = [
  { key: "13", value: "13 (3 meses aprox.)" },
  { key: "26", value: "26 (6 meses aprox.)" },
  { key: "39", value: "39 (9 meses aprox.)" },
  { key: "52", value: "52 (1 año aprox.)" }
];

const BIWEEKLY_QUOTES = [
  { key: "6", value: "6 (3 meses aprox.)" },
  { key: "12", value: "12 (6 meses aprox.)" },
  { key: "18", value: "18 (9 meses aprox.)" },
  { key: "24", value: "24 (1 año aprox.)" }
];

export const QUOTES_MAPPER = {
  weekly: WEEKLY_QUOTES,
  biweekly: BIWEEKLY_QUOTES,
  full: [{ key: "1", value: "1" }]
};

export const TOTAL_INTEREST = {
  biweekly: {
    "6": 3,
    "12": 6,
    "18": 9,
    "24": 12
  },
  weekly: {
    "13": 3,
    "26": 6,
    "39": 9,
    "52": 12
  }
};
