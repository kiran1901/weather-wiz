import { useState } from 'react'
import './App.css'
import axios from 'axios'

function App() {
	const [data, setData] = useState({})
	const [location, setLocation] = useState('')

	const getWeatherDetails = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=imperial&appid=895284fb2d2c50a520ea537456963d9c`

	const searchLocation = (event) => {
		if (event.key === 'Enter') {

			axios.get(getWeatherDetails)
			
			.then((response) => {
				setData(response.data)
				console.log(response.data)
			})
			.catch((error) => {   
				alert("Please enter valid Location!");
				console.log(error)
			})

			setLocation('')
		}
	}

	return (
		<div className="app">
			<div className="search">
				<div className="app-title">
					<p>WeatherWiz</p>
				</div>
				<input
					value={location}
					onChange={event => setLocation(event.target.value)}
					onKeyPress={searchLocation}
					placeholder='Enter Location'
					type="text" />
			</div>
			<div className="container">
				<div className="top">
					<div className="location">
						<p>{data.name}</p>
					</div>
					<div className="temp">
						{data.main ? <h1>{data.main.temp.toFixed()}°F</h1> : null}
					</div>
					<div className="description">
						{data.weather ? <p>{data.weather[0].main}</p> : null}
					</div>
					<div className="cloud-description">
						{data.weather ? <p>{data.weather[0].description}</p> : null}
					</div>
					
				</div>

				{
					data.name === undefined &&
					<div className="bottom">
						<div className="feels">
							<p>Welcome To WeatherWiz!</p>
						</div>
					</div>
				}

				{
					data.name === undefined &&
					<div className="bottom">
						<div className="feels">
						<p>Please search some Location to get details</p>
						</div>
						
					</div>
				}

				{
					data.name !== undefined &&
					<div className="bottom">
						<div className="feels">
						{data.main ? <p className='bold'>{data.coord.lat}</p> : "-"}
						<p>Latitude</p>
						</div>
						<div className="humidity">
						{data.main ? <p className='bold'>{data.coord.lon}</p> : "-"}
						<p>Longitude</p>
						</div>
					</div>
				}

				{
					data.name !== undefined &&
					<div className="bottom">
						<div className="feels">
						{data.main ? <p className='bold'>{data.main.temp_max.toFixed()}°F</p> : "-"}
						<p>Maximum Temperature</p>
						</div>
						<div className="humidity">
						{data.main ? <p className='bold'>{data.main.temp_min.toFixed()}°F</p> : "-"}
						<p>Minimum Temperature</p>
						</div>
					</div>
				}


				{
					data.name !== undefined &&
					<div className="bottom">
						<div className="feels">
						{data.main ? <p className='bold'>{data.main.feels_like.toFixed()}°F</p> : "-"}
						<p>Feels Like</p>
						</div>
						<div className="humidity">
						{data.main ? <p className='bold'>{data.main.humidity}%</p> : "-"}
						<p>Humidity</p>
						</div>
						<div className="wind">
						{data.wind ? <p className='bold'>{data.wind.speed.toFixed()} MPH</p> : "-"}
						<p>Wind Speed</p>
						</div>
					</div>
				}

			</div>
		</div>
	);
	}

	export default App
