const currency = new Intl.NumberFormat("US", {
  currency: "USD",
  style: "currency",
});

export const formatCurrency = (num: number) => {
  return currency.format(num);
};
