import React, { useContext, useEffect, useState } from 'react'
import WeatherContext from '../Context/WeatherContext';

function Searchbar() {
  const {setcity} = useContext(WeatherContext);
  const [inputcity, setinputcity] = useState("");
  const [suggestions, setsuggestions] = useState([]);
  const [DebounceTime, setDebounceTime] = useState(null);

  //Cities Array
    const cities = [
    "Delhi",
    "Mumbai",
    "Bangalore",
    "Chennai",
    "Kolkata",
    "New York",
    "London",
    "Tokyo",
    "Paris",
    "Dubai",
    "Toronto",
    "Singapore",
    "Berlin",
    "Sydney",
  ];

  //DebounceTime 
  useEffect(() => {
    if(DebounceTime){clearTimeout(DebounceTime)};
    const timeout=setTimeout(() => {
      if(inputcity.length>1){
        const filterdCities=cities.filter((c)=>c.toLowerCase().startsWith(inputcity.toLowerCase()));
        setsuggestions(filterdCities);
      }else{
        setsuggestions([]);
      }
    }, 300);
    setDebounceTime(timeout);
    // eslint-disable-next-line
  },[inputcity]);
  
  //handleSelect
  const handleSelect=(cityname)=>{
    setcity(cityname);
    setsuggestions([]);
    setinputcity(cityname);
  }

  //handle Enter Button
  const handleEnterClick=(e)=>{
    if(e.key==="Enter"){
      setcity(inputcity);
      setsuggestions([]);
    }
  }
  return (
<div className="position-relative" style={{ width: "250px" }}>
      <input className='form-control' value={inputcity} type='text' onChange={(e)=>setinputcity(e.target.value)} onKeyDown={handleEnterClick}></input>
      {suggestions.length>0 && <ul className="list-group">
        {suggestions.map((cityname,index)=>(<li key={index} className="list-group-item" onClick={()=>handleSelect(cityname)} style={{cursor:"pointer"}}>{cityname}</li>))}
        </ul>}
    </div>

  )
}

export default Searchbar;