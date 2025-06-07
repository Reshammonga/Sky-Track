import React, { useEffect,useContext, useState } from 'react'
import WeatherContext from '../Context/WeatherContext';

function WeatherInfo() {

    const ApiKey="094f73629282ae3e8177343466091122";
    const {unit,city,weatherData,setweatherData,forecastData,setforecastData,setcity} = useContext(WeatherContext);
    const [loader, setloader] = useState(false);
    const [error, seterror] = useState("");

    useEffect(() => {
    async function getData() {
        if(!city){return}
        setloader(true);
        seterror("");
      try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${ApiKey}&units=${unit}`);
        if (!response.ok) {
          throw new Error(`Response status: ${response.status}`);
        }

        const weather = await response.json();
        setweatherData(weather);

        const responseforecast = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${ApiKey}&units=${unit}`);
        if (!responseforecast.ok) {
          throw new Error(`Response status: ${responseforecast.status}`);
        }

        const forecast = await responseforecast.json();
        setforecastData(forecast);
      } catch (error) {
        seterror(error);
        setweatherData(null);
        setforecastData(null);
      }
      setloader(false);
    };
    getData();
    // eslint-disable-next-line
    }, [city,unit])
    
    useEffect(() => {
      navigator.geolocation.getCurrentPosition(async(postion)=>{
        const {latitude,longitude}=postion.coords;
        try{
          const geolocation=await fetch( `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${ApiKey}&units=${unit}`);
          const geoData=await geolocation.json();
          setcity(geoData.name);
        }catch(error){
            seterror(error);
        }
      },(error)=>{
        seterror(`Geolocation not allowed or failed : ${error}`)
      })
      // eslint-disable-next-line
    }, [])
    
    if(!city){return null};

  return (
    <div className="container position-relative text-center">
        {loader && <div className="spinner-border" role="status">
       <span className="visually-hidden">Loading...</span>
        </div>}
        {error &&<div className="alert alert-danger" role="alert">
       {error.message || "Something went wrong!"}
        </div>}
         {weatherData && (
        <>
          <div
            className="container card text-center mb-3"
            style={{ width: "18rem" }}
          >
            <div className="card-body">
              <h3 className="card-title">
                {weatherData.name}, {weatherData.sys.country}
              </h3>
              <h4 className="card-title">{Math.round(weatherData.main.temp)}°{unit === "metric" ? "C" : "F"}</h4>
              <p>
                {weatherData.weather[0].main} - {weatherData.weather[0].description}
              </p>
              <p>
                {" "}
                Wind : {weatherData.wind.speed} , Clouds : {weatherData.clouds.all} %
              </p>
              <p> Visibility : {weatherData.visibility} m </p>
              <h5 className="card-title">
                {" "}
                {weatherData.rain?.["1h"] &&
                  `Rain: ${weatherData.rain["1h"]} mm/h`}{" "}
                {weatherData.snow?.["1h"] && `, Snow: ${weatherData.snow["1h"]} mm/h`}
              </h5>
              <h5 className="card-title">
                Sunrise :{" "}
                {new Date(weatherData.sys.sunrise * 1000).toLocaleTimeString()}{" "}
                Sunset :{" "}
                {new Date(weatherData.sys.sunset * 1000).toLocaleTimeString()}
              </h5>
            </div>
          </div>
        </>
        )}
        {forecastData && (

          <>
          <h2 >Future Forecast 🏞️</h2>
                <div className="container d-flex justify-content-center mx-3 mb-5 row">
                    
                    {
                        forecastData.list.filter((_,i)=>(i%8===0)).map((item,index)=>(<div className='col-md-2  mb-3' key={index}>
                            <div className='card p-2'>
                                <p>{new Date(item.dt*1000).toLocaleDateString()}</p>
                                <p>{Math.round(item.main.temp)}&deg;{unit==="metric"?"C":"F"}</p>
                                <p>{item.weather[0].main}</p>
                                </div>
                        </div>
                        ))
                    }
                </div>
                </>
        )}
        
        </div>
  )
}

export default WeatherInfo;