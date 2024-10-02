import React, { useState } from 'react';
import './WeatherApp.css';
import axios from 'axios';

const Weather = () => {
	const [city, setCity] = useState('');
	const [weather, setWeather] = useState(null);
	const [error, setError] = useState('');

	const fetchWeather = async () => {
		try {
			const response = await axios.get(
				`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.REACT_APP_WEATHER_API_KEY}&units=metric`
			);
			setWeather(response.data);
			setError('');
		} catch (err) {
			setError('City not found');
			setWeather(null);
		}
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		fetchWeather();
	};

	return (
	<div>
		<h2>Weather Forecast</h2>
		<form onSubmit={handleSubmit}>
			<input
			type='text'
			placeholder='Enter city name'
			value={city}
			onChange={(e) => setCity(e.target.value)}
			/>
			<button type="submit">Get Weather</button>
		</form>

		{error && <p>{error}</p>}

		{weather && (
		<div>
			<h3>{weather.name}, {weather.sys.country}</h3>
			<p>{weather.weather[0].description}</p>
			<p>Temperature: {weather.main.temp}°C</p>
			<p>Humidity: {weather.main.humidity}%</p>
			<p>Wind Speed: {weather.wind.speed} m/s</p>
		</div>
		)}

	</div>
	);
};

export default Weather;