import { API_URL } from "../utils";

export const getCountries = async () => {
  const res = await fetch(`${API_URL}/all`);
  const countries = await res.json();
  return countries;
};
