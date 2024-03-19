import { renderViewDashboard } from "./view-dashboard.js";

if (window.location.search.includes('?country=')) {
  let country = window.location.search;
  console.log(country);
  renderCountriesList(country);
} else {
  renderViewDashboard();
}