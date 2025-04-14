const API_KEY = '62a15361828740c790f131241251404';
const cityInput = document.getElementById('cityInput');
const searchBtn = document.getElementById('searchBtn');
const locateBtn = document.getElementById('locateBtn');

searchBtn.addEventListener('click', () => {
  const city = cityInput.value.trim();
  if (city) fetchWeather(city);
});

locateBtn.addEventListener('click', () => {
  navigator.geolocation.getCurrentPosition(pos => {
    const { latitude, longitude } = pos.coords;
    fetchWeather(`${latitude},${longitude}`);
  });
});

function fetchWeather(query) {
  const url = `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${query}&days=8&aqi=yes&alerts=no`;

  fetch(url)
    .then(res => res.json())
    .then(data => {
      updateCurrentWeather(data);
      updateForecast(data.forecast.forecastday);
    })
    .catch(() => alert("Something went wrong or city not found!"));
}

function updateCurrentWeather(data) {
  document.querySelector('.temp').innerText = `${data.current.temp_c} °C`;
  document.querySelector('.condition').innerText = data.current.condition.text;
  document.querySelector('.location').innerText = `${data.location.name}, ${data.location.country}`;
  document.querySelector('.date').innerText = new Date(data.location.localtime).toDateString();

  document.getElementById('aqi').innerText = data.current.air_quality.pm2_5.toFixed(1);
  document.getElementById('humidity').innerText = `${data.current.humidity}%`;
  document.getElementById('pressure').innerText = `${data.current.pressure_mb} hPa`;
  document.getElementById('wind').innerText = `${data.current.wind_kph} m/s`;
  document.getElementById('feelsLike').innerText = `${data.current.feelslike_c} °C`;
  document.getElementById('visibility').innerText = `${data.current.vis_km} km`;
}

function updateForecast(forecastDays) {
  const forecastList = document.getElementById('forecastList');
  forecastList.innerHTML = '';

  forecastDays.forEach(day => {
    const date = new Date(day.date).toDateString();
    const icon = day.day.condition.icon;
    const maxTemp = day.day.maxtemp_c;
    const minTemp = day.day.mintemp_c;
    const condition = day.day.condition.text;

    const item = document.createElement('div');
    item.classList.add('forecast-item');
    item.innerHTML = `
      <p>${date}</p>
      <img src="https:${icon}" alt="${condition}" />
      <p>${condition}</p>
      <p>Max: ${maxTemp}°C</p>
      <p>Min: ${minTemp}°C</p>
    `;
    forecastList.appendChild(item);
  });
}
