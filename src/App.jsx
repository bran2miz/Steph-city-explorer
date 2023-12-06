import React, { useState } from 'react';
import axios from 'axios';
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import CityForm from "./components/CityForm.jsx";
import Map from './components/Map.jsx';
import ErrorComponent from './components/Error.jsx';
import Weather from './components/Weather.jsx';

const API_KEY = import.meta.env.VITE_API_KEY;

function App() {
  const [city, setCity] = useState('');
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [forecast, setForecast] = useState(null);

  async function fetchWeatherData(lat, lon, date) {
    try {
      const response = await axios.get(`http://localhost:3000/weather`, {
        params: {
          lat: lat,
          lon: lon,
          date: date
        }
      });
      setForecast(response.data);
    } catch (error) {
      console.error('Error fetching weather data:', error);
    }
  }

  async function getLocation(cityName) {
    if (!cityName) {
      return;
    }

    let url = `https://us1.locationiq.com/v1/search?key=${API_KEY}&q=${cityName}&format=json`;

    try {
      let response = await axios.get(url);
      if (response.data && Array.isArray(response.data) && response.data.length > 0) {
        setCity(response.data[0].display_name);
        setLatitude(response.data[0].lat);
        setLongitude(response.data[0].lon);
        setErrorMessage('');

        
        const nextDay = new Date();
        nextDay.setDate(nextDay.getDate() + 1);
        const formattedDate = `${nextDay.getFullYear()}-${nextDay.getMonth() + 1}-${nextDay.getDate()}`;
        fetchWeatherData(response.data[0].lat, response.data[0].lon, formattedDate);
        console.log('Sending request to backend...');
      } else {
        setErrorMessage(`No location found for '${cityName}'. Please try a different location.`);
      }
    } catch (error) {
      console.error(error.message);
      setErrorMessage(`We're having trouble finding that location. Please try again.`);
    }
  }

  function changeCity(newCity) {
    getLocation(newCity);
    console.log("Changing to", newCity);
  }

  return (
    <div className="app-container">
      <Header />
      {errorMessage && <ErrorComponent message={errorMessage} />}
      <div className="form-container">
        <CityForm city={city} handleChangeCity={changeCity} />
        {latitude && longitude && <Map latitude={latitude} longitude={longitude} city={city} />}
        {forecast && <Weather forecast={forecast} />}
        <Footer />
      </div>
    </div>
  );
}

export default App;
