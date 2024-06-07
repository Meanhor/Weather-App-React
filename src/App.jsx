import React, { useState } from "react";

function App() {
  const [data, setData] = useState({});
  const [location, setLocation] = useState("");
  const apiKey = "OPENWEATHERMAP_API_KEY"; 
  const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

  const searchLocation = async (event) => {
    if (event.key === "Enter") {

      if (/\d/.test(location)) {
        window.alert("City name should not include numbers");
        setLocation(""); // Clear the input field
        console.log("City name should not include numbers");
        return; // Stop the execution of the function
      }

      try {
        const response = await fetch(`${apiUrl}${location}&appid=${apiKey}`);
        
        if (response.status === 404) {
          window.alert("Invalid City Name");
          setData({});
          setLocation('');
          console.log("Invalid City Name");
        } else {
          const data = await response.json();
          setData(data);
          setLocation(""); // Clear the input field
          console.log(data);
        }
      } catch (error) {
        window.alert("City name should not include special characters");
        setData({});
        console.log("City should not include special character");
      }
    }
  };

  return (
    <div className="app">
      <div className="search">
        <input
          type="text"
          value={location}
          onChange={(event) => setLocation(event.target.value)}
          onKeyPress={searchLocation}
          placeholder="Enter Location"
          
        />
      </div>
      <div className="container">
        <div className="top">
          <div className="location">
            <p>{data.name}</p>
          </div>
          <div className="temp">
            {data.main ? <h1>{data.main.temp.toFixed()}°C</h1> : null}
          </div>
          <div className="description">
            {data.weather ? <p>{data.weather[0].main}</p> : null}
          </div>
        </div>

        {data.name && (
          <div className="bottom">
            <div className="feels">
              {data.main ? (
                <p className="bold">{data.main.feels_like.toFixed()} °C</p>
              ) : null}
              <p>Feels Like</p>
            </div>
            <div className="humidity">
              {data.main ? <p className="bold">{data.main.humidity}%</p> : null}
              <p>Humidity</p>
            </div>
            <div className="wind">
              {data.wind ? (
                <p className="bold">{data.wind.speed.toFixed()} MPH</p>
              ) : null}
              <p>Wind Speed</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
