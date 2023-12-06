import React, { useState } from 'react';
import axios from 'axios';
import Header from './components/Header';
import Footer from './components/Footer';
import CityForm from './components/CityForm';
import Map from './components/Map';
import ErrorComponent from './components/Error';
import Weather from './components/Weather';

const API_KEY = import.meta.env.VITE_API_KEY;
 // on line 37 you forgot to implement url http://localhost:3000, for these labs, you will want to create a variable
 // like on line 13 that will have the value of your key from the .env file
 // in the .env file you will create a variable called VITE_API_SERVER=http://localhost:3000
const VITE_API_SERVER = import.meta.env.VITE_API_SERVER;
function App() {
  const [city, setCity] = useState('');
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [forecast, setForecast] = useState(null);
 
  // changed the way in which you are grabbing user input from the form.
  // first step was to add state for your search Query (line 21)
  const [searchQuery, setSearchQuery] = useState('')

  // create a function that is going to handle your searchQuery whenever someone types in a new city (line 24-27)
  // if your console is open, the log on line 26 will constantly add a new log whenever you type something into the 
  //form (every letter typed will produce a log)
  const updateCity = (e) => {
    console.log(e)
    // you then set the state of searchQuery (which is currently an empty string) using the setSearchQuery function
    // to whatever the target value will be (so if someone types in Seattle, the empty string will be replaced with
    // Seattle)
    setSearchQuery(e.target.value);
  };

  
  async function fetchWeatherData(lat, lon) {
    try {
      const response = await axios.get(`${VITE_API_SERVER}/weather`, {
        params: {
          //now that you have a function that is going to handle setting the state of searchQuery, 
          //you now can use that state (searchQuery) as a parameter for your get request to the backend (linke 44)
          
          searchQuery: searchQuery,
          latitude: lat,
          longitude: lon,
          
        },
      });
      // if you open your console, and look for Weather Response, open the request tab and look for the 
      // responseURL.You can see the longitude, latitude as well as your searchQuery implemented
      // in the url. (ie http://localhost:3001/weather?searchQuery=Seattle&latitude=47.6038321&longitude=-122.330062)
      console.log("Weather Response", response)

      setForecast(response.data);
      // setShowWeather(true);
    } catch (error) {
      console.error('Error fetching weather data:', error);
    }
  }

    // again, because searchQuery is now a part of state, when updateCity() gets called, searchQuery will be changed
    // from a blank string to whatever is typed in the form. So there is no longer a need to have a parameter inside
    // the parenthesis on line 66 (deleted cityname)
  async function getLocation() {
    // line 68 we can replace the cityname to your state, searchQuery.
    const url = `https://us1.locationiq.com/v1/search.php?key=${API_KEY}&q=${searchQuery}&format=json`;
    console.log(url)
    try {
      const response = await axios.get(url);
      if (response.data && response.data.length > 0) {
        // line 53 you are setting the state of city from an empty string
        //  to the display_name coming from locationiq.com, using setCity() function and passing in response.data[0].display_name
        // to replace the empty string with that value.
        setCity(response.data[0].display_name);
        setLatitude(response.data[0].lat);
        setLongitude(response.data[0].lon);
        setErrorMessage('');


        fetchWeatherData(response.data[0].lat, response.data[0].lon);
      } else {
        setErrorMessage(`No location found for '${searchQuery}'. Please try a different location.`);
      }
    } catch (error) {
      console.error(error.message);
      setErrorMessage(`We're having trouble finding that location. Please try again.`);
    }
  }
  // extra lines of code from line 69-73: do not really need it 
  // function changeCity(newCity) {
  //   getLocation(newCity);
  //   setShowWeather(false);
  //   console.log('Changing to', newCity);
  // }
  return (
    <div className="app-container">
      <Header />
      {errorMessage && <ErrorComponent message={errorMessage} />}
      <div className="form-container">
        {/* Now that we created a new function called updateCity, we have to pass it into the form on line 103. */}
        <CityForm updateCity={updateCity}city={city} handleGetLocation={getLocation} />
        {latitude && longitude && <Map latitude={latitude} longitude={longitude} city={city} />}
        {/* pass in city into the Weather component so that we can use the city_name as props */}
        {forecast && <Weather forecast={forecast} city={city} />}
        <Footer />
      </div>
    </div>
  );
}

export default App;

