import React from 'react';

const Weather = ({ forecast }) => {
  return (
    <div className="weather-container">
      {forecast && (
        forecast.map((day, index) =>
          <div key={index}>
            <p>Temperature: {day.temperature}°F</p>
            <p>Description: {day.description}</p>
          </div>
        ))}
    </div>
  );
};

export default Weather;
