import { renderCountriesList } from "./dom-utils.js";

let countries;
const catchApi = async () => {
  try {
    const resp = await fetch('data.json');
    const data = await resp.json();

    countries = data.map(country => {
      return {
        name: country.name,
        capital: country.capital || 'none',
        population: country.population,
        flagImage: country.flags.png,
        region: country.region
      };
    });

    return countries;
  } catch (error) {
    console.error('Błąd pobierania danych:', error);
    throw error;
  }
};

catchApi().then(() => { renderCountriesList(countries); })