const createFlagEl = (country) => {
  const imgContainer = document.createElement('div');
  const imgEl = document.createElement('img');
  imgEl.src = country.flagImage;
  imgEl.alt = `${country.name} flag`;

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

  const anchorEl = document.createElement('a');
  anchorEl.href = `?country=${country.code}`;

  countryEl.appendChild(createFlagEl(country));

  const infoContainer = document.createElement('div');
  infoContainer.classList.add('info-container');
  const countryName = document.createElement('strong');
  countryName.classList.add('country-name');
  countryName.innerText = country.name;

  infoContainer.append(
    countryName,
    createInfoEl("Population: ", country.population),
    createInfoEl("Region: ", country.region),
    createInfoEl("Capital: ", country.capital));

  anchorEl.appendChild(infoContainer);
  countryEl.appendChild(anchorEl);

  return countryEl;
};

const createListElement = (countries) => {
  const listEl = document.createElement('ul');
  countries.forEach(country => {
    listEl.appendChild(createCountryEl(country));
  });

  return listEl;
};

const createDetailElement = (country) => {
  const detailConatinerEl = document.createElement('div');

  const flagImgEl = createFlagEl(country);
  const detailNameEl = document.createElement('strong');
  detailNameEl.innerText = country.name;

  detailConatinerEl.append(flagImgEl, detailNameEl);

  detailConatinerEl.append(
    createInfoEl('Native name: ', country.nativeName),
    createInfoEl('Population: ', country.population),
    createInfoEl('Region: ', country.region),
    createInfoEl('Sub region: ', country.subregion),
    createInfoEl('Capital: ', country.capital),
    createInfoEl('Top level domain: ', country.tld),
    createInfoEl('Currencies: ', country.currencies),
    createInfoEl('Languages: ', country.languages),
  );
  return detailConatinerEl;
};

export const renderCountriesList = (countries) => {
  const rootEl = document.querySelector('#root');
  const children = root.children;

  for (let i = 1; i < children.length; i++) {
    rootEl.removeChild(children[i]);
  }

  rootEl.appendChild(createListElement(countries));
};



export const renderCountryDetails = (country) => {
  const rootEl = document.querySelector('#root');
  const children = root.children;

  for (let i = 1; i < children.length; i++) {
    rootEl.removeChild(children[i]);
  }

  rootEl.appendChild(createDetailElement(country));
};