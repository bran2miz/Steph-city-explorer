import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import CityForm from "./components/CityForm.jsx";
import Map from './components/Map.jsx';
import ErrorComponent from './components/Error.jsx';

const API_KEY = import.meta.env.VITE_API_KEY;

function App() {
  const [city, setCity] = useState('');
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  async function getLocation(cityName) {
    let url = `https://us1.locationiq.com/v1/search?key=${API_KEY}&q=${cityName}&format=json`;
    try {
      let response = await axios.get(url);
      setCity(response.data[0].display_name);
      setLatitude(response.data[0].lat);
      setLongitude(response.data[0].lon);
      setErrorMessage('');
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
      
      <Map latitude={latitude} longitude={longitude} />
      <Footer />
      </div>
      
    </div>
  )
}

export default App;
