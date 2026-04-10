export const formatDate = (date) => {
  const newDate = new Date(date);

  return new Intl.DateTimeFormat("en-US", {
    day: "numeric",
    month: "long",
    weekday: "short",
    year: "numeric",
  }).format(newDate);
};

export const formatCurrency = (amount) => {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
  }).format(Number(amount));
};
