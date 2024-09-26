export const getFromLocalStorage = (key: string, defectValue: string) => {
  return JSON.parse(localStorage.getItem(key) ?? defectValue);
};
