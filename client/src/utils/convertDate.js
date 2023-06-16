export const convertDate = (date) => {
  const parts = date.split("-");
  const [year, month, day] = parts;
  const formattedDate = `${day}/${month}/${year}`;
  return formattedDate;
};
