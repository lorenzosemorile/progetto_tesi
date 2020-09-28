export const date_format = (iso) => {
  const date = new Date(iso);
  return `${date.getDate()}/${date.getMonth()+1}/${date.getFullYear()}`;
};

export const year_format = (iso) => {
  const date = new Date(iso);
  return `${date.getFullYear()}`;
};