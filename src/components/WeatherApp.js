import React, { useState } from 'react';
import './WeatherApp.css';
import axios from 'axios';
import {
	TextField, Button,
	Paper, Typography
} from '@mui/material';

const Weather = () => {
	const [city, setCity] = useState('');
	const [error, setError] = useState('');
	const [weather, setWeather] = useState(null);

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
	<Paper
	elevation={3}
	style={{
		margin: 'auto',
		padding: '20px',
		maxWidth: '400px',
	}}
	>
		<Typography variant='h4'> Weather Forecast </Typography>
		<form
		onSubmit={handleSubmit}
		style={{
			marginTop: '20px',
		}}
		>
			<TextField
			fullWidth
			value={city}
			margin='normal'
			variant='outlined'
			label='Enter City Name'
			onChange={(e) => setCity(e.target.value)}
			/>
			<Button
				type='submit' color='primary'
			>Get Weather
			</Button>
		</form>

		{error && <Typography color="error">{error}</Typography>}
		{
			weather && (
			<div style={{ marginTop: '20px' }}>
				<Typography variant="h6">
					{weather.name}, {weather.sys.country} {weather.weather[0].description}
				</Typography>
				<Typography variant="body1">Temperature: {weather.main.temp}°C</Typography>
				<div style={{ marginTop: '20px' }}>
					<Typography variant="body1">Humidity: {weather.main.humidity}%</Typography>
					<Typography variant="body1">Wind Speed: {weather.wind.speed} m/s</Typography>
				</div>
			</div>
			)}
	</Paper>
	);
};

export default Weather;