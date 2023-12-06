/* eslint-disable react/prop-types */
import React from 'react';

const Weather = (props) => {
  console.log("Forecast: ",props.forecast);
  // take a look at your console and open the tabs for 
  // props.forecast; do you see any key that has a value display_name?
  console.log("City= ", props.city);
  // take a look at the console for this log; do you see the city name when you typed in Seattle?
  return (

    <div className="weather-container">
      {props.forecast && (
        <div>
          {/* passed in city as props (from App.jsx) as opposed to the 
          previous code where you
           were trying to display the city 
           name using forecast[0].display_nam. props.city refers 
            the state from App.jsx (when you set the state on line 76 in App.jsx from an empty string to the display_name from locationiq.com)  */}
          <h2>Weather Forecast for {props.city}</h2>
          {props.forecast.map((day, index) => (
            <div key={index} className="weather-day">
              <p>Date: {day.date}</p>
              <p>Description: {day.description}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Weather;
