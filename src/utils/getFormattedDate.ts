export const getFormattedDate = (date: string) => {
  const parts = date.split("-");

  const newDate = new Date(`${parts[2]}-${parts[1]}-${parts[0]}`);

  return `${newDate.getFullYear()}-${newDate.getMonth() + 1}-${String(
    newDate.getUTCDate()
  ).padStart(2, "0")}`;
};
