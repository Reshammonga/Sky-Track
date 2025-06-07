import React, { useContext } from 'react'
import WeatherContext from '../Context/WeatherContext'

export default function ToggleUnit() {
    const {unit,setunit} = useContext(WeatherContext);
    const handleToggle=()=>{
        const newunit=unit==="metric"?"imperial":"metric";
        setunit(newunit);
    }
  return (
    <div className="d-flex align-items-center">
        <button onClick={handleToggle} className="btn btn-primary ms-3">
            Switch to {unit==="metric"?"°F":"°C"}
        </button>
    </div>
  )
}
