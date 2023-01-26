import React, { useState } from 'react';
import {Routes, Route, useLocation} from "react-router-dom"
import Favourites from './Components/Favourites/Favourites'
import Navbar from './Components/Navbar';
import Search from './Components/Search';

import './App.css'
import CurrentWeather from "./Components/CurrentWeather/CurrentWeather";
import { WEATHER_API_KEY, WEATHER_API_URL } from './api';
import Forecast from './Components/Forcast/Forcast';

function App() {
  const [currentWeather, setCurrentWeather] = useState<null>(null)
  const [forecast, setForecast] = useState <null>(null)
  const [fav, setFav] = useState<any[]>([])
  const [color, setColor] = useState(false);

  const location = useLocation()
  console.log(location.pathname)

 
  const addToFav = (data: any) => {
    console.log(data);
    
    if(!fav.includes(data)){
      setFav((prevValue) => (
        [...prevValue, data]
      ));
      setColor(!color)
      
    }else{
      setFav((prevValue) => (
        [...prevValue.filter((item) => item.city !== data.city)]
      ))
      setColor(false)
    }
  }

  const removeToFav = (data: any) => {
    setFav([...fav.filter((item) => item.city !== data.city)])
    setColor(false)
  }
  
  const handleOnSearchChange = (searchData: any) => {
    const [lat, lon] = searchData.value.split("")
    console.log(searchData)
    if(fav.includes(searchData.label)){
      setColor(!color)
    }else{
      setColor(false)
    }

    const currentWeatherFetch = fetch(`${WEATHER_API_URL}/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`)
    const forecastFetch = fetch(`${WEATHER_API_URL}/forecast?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`)
    
    Promise.all([currentWeatherFetch, forecastFetch])
      .then(async (response) => {
        const weatherResponse = await response[0].json();
        const forecastResponse = await response[1].json();

        setCurrentWeather({ city: searchData.label, ...weatherResponse });
        setForecast({ city:searchData.label, ...forecastResponse });
      })
      .catch((err) => console.log(err));
  }
  

  return (
    <>
    <Navbar/>
      <div className='container'>
        <Routes>
          <Route path='/' element={
           <>
            <Search onSearchChange={handleOnSearchChange}/>
            {currentWeather && <CurrentWeather data={currentWeather} add={addToFav} color={color}/>}
            {forecast && <Forecast data={forecast} />}
           </>
          } />  
        </Routes>
        {fav.length ? (fav.map((item: any, id: any) => (
          <Routes>
            <Route path='/favourites' element = {<Favourites key={id} data={item} removeFav={removeToFav} color={color} />} />
          </Routes>
        ))) : (<p style={{width: '360px', 
                         margin: '20px auto 0',
                         fontWeight: '600',
                         fontSize: 'larger',
                         borderRadius: '6px',
                         backgroundColor: '#333',
                         color: '#fff',
                         padding: '20px 20px 20px 35px',
                         whiteSpace: 'nowrap'
                        }}
                > You can add favorite city to list.</p>)}
                
      </div>
    </>
  );
}

export default App;

            