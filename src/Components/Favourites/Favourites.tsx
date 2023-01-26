import React from "react";
import FavoriteIcon from "@mui/icons-material/Favorite";

import "./fav.css";

type Props = { 
  color: any
  data: any,
  removeFav: any
};

const Favourites = ({ data , removeFav, color}: Props) => {
  
  

  return (
    <div className="weather">
    <div className="top">
      <div>
        <p className="city">{data.city}</p>
        <p className="weather-description">
          {data.weather[0].description}
        </p>
      </div>
      <img
        src={`icons/${data.weather[0].icon}.png`}
        alt="weather"
        className="weather-icon"
      />
    </div>
    <FavoriteIcon onClick={() => removeFav(data)} style={color === true ? { color: "red" } : { color: '' }}/>
    <div className="bottom">
      <p className="temperature">{Math.round(data.main.temp)}°C</p>
      <div className="details">
        <div className="parameter-row detail">
          <span className="parameter-label">Details</span>
        </div>
        <div className="parameter-row">
          <span className="parameter-label">Feels like</span>
          <span className="parameter-value">
            {Math.round(data.main.feels_like)}°C
          </span>
        </div>
        <div className="parameter-row">
          <span className="parameter-label">Max Temp</span>
          <span className="parameter-value">
            {Math.round(data.main.temp_max)}
          </span>
        </div>
        <div className="parameter-row">
          <span className="parameter-label">Min Temp</span>
          <span className="parameter-value">
            {Math.round(data.main.temp_min)}
          </span>
        </div>
        <div className="parameter-row">
          <span className="parameter-label">Humidity</span>
          <span className="parameter-value">{data.main.humidity}</span>
        </div>
      </div>
    </div>
  </div>
  )
    
};

export default Favourites;



