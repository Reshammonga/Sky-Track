import React, { useEffect, useState } from 'react'
import WeatherContext from './WeatherContext';


function WeatherState({children}) {
    const [unit, setunit] = useState(()=>{
    return localStorage.getItem("unit")||"metric";
    }
    );
    const [city, setcity] = useState("");
    const [weatherData, setweatherData] = useState(null);
    const [forecastData, setforecastData] = useState(null);

    useEffect(() => {
      localStorage.setItem("unit",unit)
    }, [unit])
    
  return (
    <WeatherContext.Provider value={{unit,setunit,city,setcity,weatherData,setweatherData,forecastData,setforecastData}}>
        {children}
    </WeatherContext.Provider>
  )
}

export default WeatherState