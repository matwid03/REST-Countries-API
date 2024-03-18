const createFlagEl = (country) => {
  const imgContainer = document.createElement('div');
  const imgEl = document.createElement('img');
  imgEl.src = country.flagImage;

  imgContainer.appendChild(imgEl);
  return imgContainer;
};

const createInfoEl = (labelName, value) => {
  const infoEl = document.createElement('div');

  const labelElement = document.createElement('strong');
  labelElement.innerText = labelName;
  const valueElement = document.createElement('span');
  valueElement.innerText = value;

  infoEl.append(labelElement, valueElement);

  return infoEl;
};

const createCountryEl = (country) => {
  const countryEl = document.createElement('li');

  const countryName = document.createElement('span');
  countryName.innerText = country.name;

  countryEl.append(createFlagEl(country),
    countryName,
    createInfoEl("Population: ", country.population),
    createInfoEl("Region: ", country.region),
    createInfoEl("Capital: ", country.capital));

  return countryEl;
};

const createListElement = (countries) => {
  const listEl = document.createElement('ul');
  countries.forEach(country => {
    listEl.appendChild(createCountryEl(country));
  });

  return listEl;
};

export const renderCountriesList = (countries) => {
  const rootEl = document.querySelector('#root');
  rootEl.appendChild(createListElement(countries));
};