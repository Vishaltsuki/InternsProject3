import React, { useState } from 'react';
import './App.css';  // Import the CSS file

const App = () => {
  const [city, setCity] = useState("");
  const [result, setResult] = useState("");
  const [forecast, setForecast] = useState([]);
  
  const changeHandler = e => {
    setCity(e.target.value);
  };

  const submitHandler = e => {
    e.preventDefault();
    const apiKey = 'd885aa1d783fd13a55050afeef620fcb';
    
    // Fetch current weather
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`)
      .then(response => response.json())
      .then(data => {
        const kelvin = data.main.temp;
        const celcius = kelvin - 273.15;
        setResult("Temperature at " + city + "\n" + Math.round(celcius) + "°C");
      })
      .catch(error => console.log(error));
    
    // Fetch 5-day forecast
    fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`)
      .then(response => response.json())
      .then(data => {
        const forecastData = data.list.filter(reading => reading.dt_txt.includes("12:00:00"));
        setForecast(forecastData);
      })
      .catch(error => console.log(error));

    setCity("");
  };

  return (
    <div>
      <center>
        <div className="card">
          <div className="card-body">
            <h4 className="card-title">Weather App</h4>
            <form onSubmit={submitHandler}>
              <input size="30" type="text" name="city" onChange={changeHandler} value={city} /><br /><br />
              <input type="submit" value="Get Temperature" />
            </form><br /><br />
            <div>
              <h1>{result}</h1>
              <h2>5-Day Forecast</h2>
              <div className="forecast">
                {forecast.map((weather, index) => (
                  <div key={index} className="forecast-item">
                    <p>{new Date(weather.dt_txt).toDateString()}</p>
                    <p>{Math.round(weather.main.temp - 273.15)}°C</p>
                    <p>{weather.weather[0].description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </center>
    </div>
  );
};

export default App;
