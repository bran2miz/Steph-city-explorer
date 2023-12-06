import React from 'react';

const Weather = ({ forecast }) => {
  return (
    <div className="weather-container">
      {forecast && (
        <div>
          <h2>Weather Forecast for {forecast[0].city_name}</h2>
          {forecast.map((day, index) => (
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
