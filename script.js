const apiKey = 'fd74323c1524f9b673eea8f40d3373ab'; // Replace with your actual API key
const weatherCard = document.getElementById('weather-card');
const cityInput = document.getElementById('city-input');
const searchBtn = document.getElementById('search-btn');

searchBtn.addEventListener('click', () => {
  const city = cityInput.value.trim();
  if (city) fetchWeather(city);
});

async function fetchWeather(city) {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&units=metric&appid=${apiKey}`;
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error('City not found');
    const data = await res.json();
    updateUI(data);
  } catch (err) {
    alert(err.message);
  }
}

function updateUI(data) {
  document.getElementById('city-name').textContent = `${data.name}, ${data.sys.country}`;
  document.getElementById('date').textContent = new Date().toLocaleString();
  document.getElementById('weather-icon').src =
    `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
  document.getElementById('temperature').textContent = `${Math.round(data.main.temp)}°C`;
  document.getElementById('description').textContent = data.weather[0].description;
  document.getElementById('humidity').textContent = `Humidity: ${data.main.humidity}%`;
  document.getElementById('wind').textContent = `Wind: ${data.wind.speed} m/s`;
  weatherCard.classList.remove('hidden');
}
