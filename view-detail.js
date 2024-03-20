import { renderCountryDetails } from "./dom-utils.js";

export const renderDetail = () => {
  const searchParams = new URLSearchParams(window.location.search);
  const countryCode = searchParams.get('country');
  if (!countryCode) {
    goBackToDashboard();
  }
  const API_URL_DETAIL = `https://restcountries.com/v3.1/alpha/${countryCode}`;

  const catchApi = async () => {
    try {
      const resp = await fetch(API_URL_DETAIL);
      const data = await resp.json();

      if (!data) {
        goBackToDashboard();
        return;
      }


      const countryData = data[0];

      const country = {
        name: countryData.name.common,
        capital: countryData.capital || 'none',
        population: countryData.population.toLocaleString('en-us', 'decimal'),
        nativeName: Object.values(countryData.name.nativeName).map(nativeName => nativeName.official).join(', '),
        flagImage: countryData.flags.png,
        region: countryData.region,
        subregion: countryData.subregion,
        code: countryData.cioc,
        currencies: Object.values(countryData.currencies).map(currency => currency.name).join(', '),
        languages: Object.values(countryData.languages).join(', '),
        tld: countryData.tld[0],
        borders: countryData.borders,
      };

      renderCountryDetails(country);

    } catch (error) {
      console.error('Błąd pobierania danych:', error);
      throw error;
    }
  };
  catchApi();


  const goBackToDashboard = () => {
    window.location.href = '/';
  };
};