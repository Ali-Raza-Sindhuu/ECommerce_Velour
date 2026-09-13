export const parsePrice = (value) =>
  typeof value === "number" ? value : parseFloat(String(value).replace(/[^0-9.]/g, "")) || 0;

export const formatPrice = (value) => `$${Number(value).toFixed(2)}`;
