import { useContext } from 'react';
import Searchbar from './Searchbar';
import ToggleUnit from './ToggleUnit';
import WeatherInfo from './WeatherInfo';
import WeatherContext from '../Context/WeatherContext';
import '../App.css';


function AppContent() {
  const {weatherData} = useContext(WeatherContext);
  const getBackgroundClass=()=>{
    if(!weatherData) return "default";
    const main=weatherData.weather[0].main.toLowerCase();
    if(main.includes("cloud"))return "cloudy";
        if (main.includes("rain")) return "rainy";
    if (main.includes("clear")) return "sunny";
    if (main.includes("snow")) return "snowy";
    return "default";
  }
  return (
     <div className={`App ${getBackgroundClass()}`}>
      <div className="text-center mb-4">
         <h2>Sky-Track</h2>
    <div className="container d-flex flex-wrap justify-content-center gap-2 mb-3" style={{ maxWidth: "600px" }}>
  <Searchbar />
  <ToggleUnit />
</div>

      </div>
      <WeatherInfo></WeatherInfo>
    </div>


  );
}

export default AppContent;
