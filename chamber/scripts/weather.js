// Weather API Configuration
const WEATHER_API_KEY = '5d96f7cc65958f7678fe05481887cea4'; // Replace with your OpenWeatherMap API key
const LATITUDE = 0.21767; // Butere, Kenya latitude
const LONGITUDE = 34.487720; // Butere, Kenya longitude

// DOM Elements
const currentWeatherEl = document.getElementById('current-weather');
const weatherForecastEl = document.getElementById('weather-forecast');

// Fetch current weather data
async function getCurrentWeather() {
    try {
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?lat=${LATITUDE}&lon=${LONGITUDE}&units=metric&appid=${WEATHER_API_KEY}`
        );

        if (!response.ok) {
            throw new Error(`Weather API error! status: ${response.status}`);
        }

        const data = await response.json();
        displayCurrentWeather(data);

    } catch (error) {
        console.error('Error fetching current weather:', error);
        displayWeatherError();
    }
}

// Fetch weather forecast
async function getWeatherForecast() {
    try {
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/forecast?lat=${LATITUDE}&lon=${LONGITUDE}&units=metric&appid=${WEATHER_API_KEY}`
        );

        if (!response.ok) {
            throw new Error(`Forecast API error! status: ${response.status}`);
        }

        const data = await response.json();
        displayWeatherForecast(data);

    } catch (error) {
        console.error('Error fetching weather forecast:', error);
        displayForecastError();
    }
}

function displayCurrentWeather(data) {
    const temperature = Math.round(data.main.temp);
    const description = data.weather[0].description;
    const iconCode = data.weather[0].icon;

    // Get weather icon based on condition
    const weatherIcon = getWeatherIcon(iconCode);

    currentWeatherEl.innerHTML = `
        <div class="weather-icon">${weatherIcon}</div>
        <div class="temperature">${temperature}°C</div>
        <div class="weather-description">${description}</div>
        <div class="location">Butere, Kenya</div>
    `;
}

function displayWeatherForecast(data) {
    // Get forecast for next 3 days (8 data points per day, so we'll take one per day)
    const dailyForecasts = [];

    for (let i = 0; i < data.list.length; i += 8) {
        if (dailyForecasts.length < 3) {
            dailyForecasts.push(data.list[i]);
        }
    }

    weatherForecastEl.innerHTML = dailyForecasts.map(day => {
        const date = new Date(day.dt * 1000);
        const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });
        const temperature = Math.round(day.main.temp);
        const description = day.weather[0].description;
        const iconCode = day.weather[0].icon;
        const weatherIcon = getWeatherIcon(iconCode);

        return `
            <div class="forecast-day">
                <div class="forecast-date">${dayName}</div>
                <div class="weather-icon">${weatherIcon}</div>
                <div class="forecast-temp">${temperature}°C</div>
                <div class="forecast-desc">${description}</div>
            </div>
        `;
    }).join('');
}

function getWeatherIcon(iconCode) {
    const iconMap = {
        '01d': '☀️',
        '01n': '🌙',
        '02d': '⛅',
        '02n': '☁️',
        '03d': '☁️',
        '03n': '☁️',
        '04d': '☁️',
        '04n': '☁️',
        '09d': '🌧️',
        '09n': '🌧️',
        '10d': '🌦️',
        '10n': '🌦️',
        '11d': '⛈️',
        '11n': '⛈️',
        '13d': '❄️',
        '13n': '❄️',
        '50d': '🌫️',
        '50n': '🌫️'
    };

    return iconMap[iconCode] || '🌈';
}

function displayWeatherError() {
    currentWeatherEl.innerHTML = `
        <div class="weather-error">
            <i class="fas fa-exclamation-triangle"></i>
            <p>Unable to load current weather</p>
        </div>
    `;
}

function displayForecastError() {
    weatherForecastEl.innerHTML = `
        <div class="forecast-error">
            <i class="fas fa-exclamation-triangle"></i>
            <p>Unable to load forecast</p>
        </div>
    `;
}

// Initialize weather data
document.addEventListener('DOMContentLoaded', () => {
    getCurrentWeather();
    getWeatherForecast();
});