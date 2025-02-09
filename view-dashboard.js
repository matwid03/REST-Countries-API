import { renderCountriesList } from "./dom-utils.js";

export const renderViewDashboard = () => {
  let countries;
  let query = '';
  let region = '';
  const catchApi = async () => {
    try {
      const resp = await fetch('data.json');
      const data = await resp.json();

      countries = data.map(country => {
        return {
          name: country.name,
          capital: country.capital || 'none',
          population: country.population.toLocaleString('en-us', 'decimal'),
          flagImage: country.flags.png,
          region: country.region,
          code: country.alpha3Code,
        };
      });

      return countries;
    } catch (error) {
      console.error('Błąd pobierania danych:', error);
      throw error;
    }
  };

  catchApi().then(() => { renderCountriesList(countries); });


  const filterDataAndRender = () => {
    const filteredCountries = countries.filter(country => {
      if (region === 'All') {
        return renderCountriesList(countries);
      }
      return (country.name.toLowerCase().includes(query) && (!region || country.region === region));
    });
    renderCountriesList(filteredCountries);
  };

  document.querySelector('#query').addEventListener('input', (e) => {
    query = e.target.value.toLowerCase().trim();
    filterDataAndRender();
  });

  document.querySelector('#region').addEventListener('change', (e) => {
    region = e.target.value;
    filterDataAndRender();
  });
};