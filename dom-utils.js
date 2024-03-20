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
  detailConatinerEl.classList.add('detail-container');
  const flagContainer = document.createElement('div');
  const flagImgEl = createFlagEl(country);
  const infoContainer = document.createElement('div');
  infoContainer.classList.add('info-container-detail');
  const detailNameEl = document.createElement('strong');
  detailNameEl.classList.add('detail-name');
  detailNameEl.innerText = country.name;

  flagContainer.appendChild(flagImgEl);
  infoContainer.appendChild(detailNameEl);

  const leftDiv = document.createElement('div');
  leftDiv.append(
    createInfoEl('Native name: ', country.nativeName),
    createInfoEl('Population: ', country.population),
    createInfoEl('Region: ', country.region),
    createInfoEl('Sub region: ', country.subregion),
    createInfoEl('Capital: ', country.capital),

  );

  const rightDiv = document.createElement('div');
  rightDiv.append(
    createInfoEl('Top level domain: ', country.tld),
    createInfoEl('Currencies: ', country.currencies),
    createInfoEl('Languages: ', country.languages),
  );

  infoContainer.append(leftDiv, rightDiv);
  if (country.borders) {
    infoContainer.appendChild(borderCountriesContainer(country));
  }
  detailConatinerEl.append(flagContainer, infoContainer);

  return detailConatinerEl;
};

const createDetailBtn = (text, link) => {
  const backEl = document.createElement('a');
  backEl.innerText = text;
  backEl.classList.add('go-back-btn');
  backEl.href = link;

  return backEl;
};

const borderCountriesContainer = (country) => {
  const countriesContainer = document.createElement('div');
  countriesContainer.classList.add('border-div');
  const labelEl = document.createElement('strong');
  labelEl.innerText = "Border Countries: ";

  countriesContainer.appendChild(labelEl);

  country.borders.forEach(border => {
    countriesContainer.appendChild(createDetailBtn(border, `/?country=${border}`));
  });

  return countriesContainer;
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


  rootEl.append(createDetailBtn('Go back', 'REST-Countries-API/'), createDetailElement(country));
};

document.querySelector('#darkMode').addEventListener('click', () => {
  document.body.classList.toggle('dark-theme');

  if (localStorage.getItem('theme') == 'light') {
    localStorage.setItem('theme', 'dark');
  } else { localStorage.setItem('theme', 'light'); }
});

if (localStorage.getItem('theme') == 'light') {
  document.body.classList.remove('dark-theme');
} else if (localStorage.getItem('theme') == 'dark') {
  document.body.classList.add('dark-theme');
} else {
  localStorage.setItem('theme', 'light');
}