import React from 'react';
import {useState} from 'react';
import APIFetcher from './SubComponent/Fetch';

function Weather({myAPI}) {

    const [latt, setLatt] = useState('');
    const [long, setLong] = useState('');
    const [error, setError] = useState(null);
    const [APIURL, setAPIURL] = useState('');
    const [trigger, setTrigger] = useState(0);
    
    const regExpression = /^(\+|-)?[0-9]{1,3}\.[0-9]{4,9}$/;

    function CallMe() {

    if (!regExpression.test(latt) || !regExpression.test(long)) {

      setError('Enter latitude and longitude in DD Cordinates format (1-3digit dot 4-9decimal)');
      return;

    } else {

        setError(null);
        setAPIURL(`https://api.openweathermap.org/data/2.5/weather?lat=${latt}&lon=${long}&appid=${myAPI}`);
        setTrigger(prev => prev + 1);
    }
    }

        const { APIdata, loading, errorAPI } = APIFetcher(APIURL, trigger);

/*
      .then(function (response) {
        if (!response.ok) {
          throw new Error('Failed to fetch weather data');
        }
        return response.json();
      })

      .then(function (data) {
        setWeatherData(data);
      })

      .catch(function (err) {
        setError(err.message);
      })

      .finally(function () {
        setLoading(false);
      })
      ;
  
*/

        return(

    <div className="container">

      <h1 className="title"> Weather App (Decimal Degree / DD Coordinates)</h1>

      <div className="inputContainer">

        <input

          type="text"
          placeholder="Enter Latitude"
          value={latt}
          onChange={(e) => setLatt(e.target.value)}

        />

        <input

          type="text"
          placeholder="Enter Longitude"
          value={long}
          onChange={(e) => setLong(e.target.value)}

        />

        <button onClick={CallMe}>

          Whats the Weather

        </button>

      </div>

      {loading && <p>Loading WeatherAPI Data...</p>}

      {error ? (
      <p className="error">{error}</p>
      ) : errorAPI ? (
      <p className="error">{errorAPI}</p>
      ) : null}

      {APIdata && (

        <div className="WeatherBox">

          <h2>

            {APIdata.name
              ? `${APIdata.name}, ${APIdata.sys.country}`
              : 'Location Info Unavailable'}

          </h2>

          <p>Temperature: {(APIdata.main.temp -  273.15).toFixed(2)}°C</p>

          <p>Condition: {APIdata.weather[0].description}</p>

          <p>Humidity: {APIdata.main.humidity}%</p>

          <p>Wind Speed: {APIdata.wind.speed} m/s</p>

          <p>Lattitude: {APIdata.coord.lat}, Longitude: {APIdata.coord.lon}</p>

        </div>
      )}
      </div>
  );
}

export default Weather;