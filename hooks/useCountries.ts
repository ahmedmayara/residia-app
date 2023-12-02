import countries from "world-countries";

const formattedCountries = countries.map((country) => ({
  value: country.cca2,
  label: country.name.common,
  flag: country.flag,
  latlang: country.latlng,
  region: country.region,
}));

export const useCountries = () => {
  const getAllCountries = () => formattedCountries;

  const getByValue = (label: string) => {
    return formattedCountries.find((country) => country.label === label);
  };

  return {
    getAllCountries,
    getByValue,
  };
};
