import { fetchCountries } from './js/fetchCountries';
import debounce from 'lodash.debounce';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import './css/styles.css';

const refs = {
  search: document.querySelector('input#search-box'),
  countriesList: document.querySelector('.country-list'),
  countryInfo: document.querySelector('.country-info'),
};

const DEBOUNCE_DELAY = 300;

refs.search.addEventListener('input', debounce(onSearch, DEBOUNCE_DELAY));

function onSearch(event) {
  event.preventDefault();

  const searchQuery = event.target.value.trim();

  if (searchQuery === '') {
    cleanCountriesList();
    cleanCountryInfo();
    return;
  }

  fetchCountries(searchQuery).then(countriesArray => {
    if (countriesArray.length > 10) {
      Notify.info('Too many matches found. Please enter a more specific name.');
      cleanCountriesList();
      cleanCountryInfo();
    } else if (countriesArray.length === 1) {
      cleanCountriesList();
      renderCountryInfo(countriesArray);
    } else {
      cleanCountryInfo();
      renderCountriesList(countriesArray);
    }
  }).catch(error => {
    Notify.failure("Oops, there is no country with that name");
    cleanCountriesList();
    cleanCountryInfo();
    return;
  });
}

function renderCountriesList(countries) {
  const markup = countries
    .map(({ name, flags }) => {
      return `<li><img src="${flags.svg}" alt="${flags.alt}" width="25" height="20"><span> ${name.common}</span></li>`;
    })
    .join('');

  refs.countriesList.innerHTML = markup;
}

function renderCountryInfo(country) {
  const markup = country
    .map(({ name, flags, capital, population, languages }) => {
      return `<h2><img src="${flags.svg}" alt="${
        flags.alt
      }" width="25" height="20"><span> ${
        name.common
      }</span></h2><p><b>Capital: </b>${capital}</p><p><b>Population: </b>${population}</p><p><b>Languages: </b>${Object.values(
        languages
      ).join(', ')}</p>`;
    })
    .join('');

  refs.countryInfo.innerHTML = markup;
};

function cleanCountryInfo() {
  refs.countryInfo.innerHTML = '';
};

function cleanCountriesList() {
  refs.countriesList.innerHTML = '';
}
