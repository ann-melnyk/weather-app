const showDate = (date) => {
  let weekDayNames = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let weekDay = weekDayNames[date.getDay()];
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let currentDate = `${weekDay} ${hours}:${minutes}`;
  return currentDate;
};

const displayWeather = (response) => {
  document.querySelector("#city").innerHTML = response.data.city;
  document.querySelector("#temperature-today").innerHTML = Math.round(
    response.data.temperature.current
  );
  document.querySelector("#weather-description").innerHTML =
    response.data.condition.description;
  document.querySelector("#humidity").innerHTML =
    response.data.temperature.humidity;
  document.querySelector("#wind-speed").innerHTML = Math.round(
    response.data.wind.speed
  );
  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${response.data.condition.icon}.png`
  );
  iconElement.setAttribute("alt", response.data.condition.description);

  celsiusTemp = response.data.temperature.current;
};
const searchCity = (city) => {
  let units = "metric";
  let apiKey = "331b6a65abb0fta4adaf50df4be9b78o";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(displayWeather);
};
const handleSubmit = (event) => {
  event.preventDefault();
  let city = document.querySelector("#form-input").value;
  searchCity(city);
};

const searchLocation = (position) => {
  let units = "metric";
  let apiKey = "331b6a65abb0fta4adaf50df4be9b78o";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?lon=${position.coords.longitude}&lat=${position.coords.latitude}&key=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(displayWeather);
};
const getCurrentLocation = (event) => {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
};

const displayFahrenheitTemp = (event) => {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature-today");
  let fahrenheitTemp = (celsiusTemp * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(fahrenheitTemp);
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
};

const displayCelsiusTemp = (event) => {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature-today");
  temperatureElement.innerHTML = Math.round(celsiusTemp);
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
};

let celsiusTemp = null;

let now = new Date();
let date = document.querySelector("#date");
date.innerHTML = showDate(now);

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", handleSubmit);

let currentLocationButton = document.querySelector("#current-location-button");
currentLocationButton.addEventListener("click", getCurrentLocation);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemp);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsiusTemp);

searchCity("Kyiv");
