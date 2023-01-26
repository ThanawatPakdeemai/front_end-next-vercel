export const numberWithCommas = (x: number, decimal = 0) =>
  x.toLocaleString(undefined, {
    minimumFractionDigits: decimal,
    maximumFractionDigits: decimal
  })
