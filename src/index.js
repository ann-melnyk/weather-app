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
let now = new Date();
let date = document.querySelector("#date");
date.innerHTML = showDate(now);

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
  console.log(response);
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
let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", handleSubmit);
searchCity("Kyiv");

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
let currentLocationButton = document.querySelector("#current-location-button");
currentLocationButton.addEventListener("click", getCurrentLocation);
