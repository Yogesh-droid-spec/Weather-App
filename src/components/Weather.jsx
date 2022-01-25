
import React, { useState,useEffect } from "react";
import axios from "axios";

function Weather(){
  const[inputText,setInput] = useState("");
  const [weather,setWeather] = useState({
    cityName:" ",
    imgUrl:" ",
    temp:" "
}) 

const [query,setQuery] = useState("Delhi");

function handleChange(event){
    const value = event.target.value;
    setInput(value);
}

function handleClick(){
    if(inputText.trim().length===0){
        alert("Please Enter the city name")
    }
    else{
    setQuery(inputText)
    }
}

useEffect( () => {
    const apiKey = process.env.REACT_APP_API_KEY
    const units = "metric"
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + apiKey + "&units=" + units;
    
       axios(url).then((result) => {
        const icon = result.data.weather[0].icon
        const imageUrl = " http://openweathermap.org/img/wn/"+icon+"@4x.png" 
        setWeather({
            cityName:result.data.name,
            imgUrl:imageUrl,
            temp:result.data.main.temp
        })
        console.log(result.data);
       })
       .catch((err) => {
           alert(err);
       })
      
   },[query])
   

 


 return <div className="app">
      <div className="weather">
      <h1 className="heading">Weather App</h1>
      <input onChange={handleChange} value={inputText} className="inputBox" type="text"  placeholder="enter a city" />
      <button type="submit" onClick={handleClick}>Get Weather Data</button>
 </div>
 <div className="weatherData">
     <h1 className="city">{weather.cityName}</h1>
     <img className="weatherImage" src={weather.imgUrl} alt="Weather Image"/>
     <p className="temp">{weather.temp}°C</p>
  </div>
 </div> 

}

export default Weather;