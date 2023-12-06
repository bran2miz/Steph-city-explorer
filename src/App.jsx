import React, { useState } from 'react';
import axios from 'axios';
import Header from './components/Header';
import Footer from './components/Footer';
import CityForm from './components/CityForm';
import Map from './components/Map';
import ErrorComponent from './components/Error';
import Weather from './components/Weather';

const API_KEY = import.meta.env.VITE_API_KEY;

function App() {
  const [city, setCity] = useState('');
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [forecast, setForecast] = useState(null);
  const [showWeather, setShowWeather] = useState(false);

  async function fetchWeatherData(lat, lon) {
    try {
      const response = await axios.get('/weather', {
        params: {
          lat: lat,
          lon: lon,
        },
      });
      
      setForecast(response.data);
      setShowWeather(true);
    } catch (error) {
      console.error('Error fetching weather data:', error);
    }
  }

  async function getLocation(cityName) {
    if (!cityName) {
      return;
    }

    const url = `https://us1.locationiq.com/v1/search.php?key=${API_KEY}&q=${cityName}&format=json`;

    try {
      const response = await axios.get(url);
      if (response.data && response.data.length > 0) {
        setCity(response.data[0].display_name);
        setLatitude(response.data[0].lat);
        setLongitude(response.data[0].lon);
        setErrorMessage('');

        fetchWeatherData(response.data[0].lat, response.data[0].lon);
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
    setShowWeather(false);
    console.log('Changing to', newCity);
  }

  return (
    <div className="app-container">
      <Header />
      {errorMessage && <ErrorComponent message={errorMessage} />}
      <div className="form-container">
        <CityForm city={city} handleChangeCity={changeCity} />
        {latitude && longitude && <Map latitude={latitude} longitude={longitude} city={city} />}
        {showWeather && forecast && <Weather forecast={forecast} />}
        <Footer />
      </div>
    </div>
  );
}

export default App;
