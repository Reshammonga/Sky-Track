import React from 'react'
import AppContent from './Components/AppContent';
import WeatherState from  './Context/WeatherState';

function App() {
  return (
       <WeatherState>
      <AppContent />
    </WeatherState>
  )
}

export default App