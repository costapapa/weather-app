import './WeatherApp.css'

import search_icon from "../Icons/search.png"
import drizzle_icon from "../Icons/drizzle.png"
import rain_icon from "../Icons/rain.png"
import wind_icon from "../Icons/wind.png"
import snow_icon from "../Icons/snow.png"
import humidity_icon from "../Icons/humidity.png"
import clear_icon from "../Icons/clear.png"
import cloud_icon from "../Icons/cloud.png"
import { useState } from 'react'



export default function WeatherApp() {

    const api_key = process.env.REACT_APP_APIKEY

    const [wicon, setWicon] = useState(cloud_icon)

    async function search(){
        const element = document.getElementsByClassName("cityInput")
        if(element[0].value === "")
        {
            return 0
        }
        let url = `https://api.openweathermap.org/data/2.5/weather?q=${element[0].value}&units=Metric&appid=${api_key}`
        let response = await fetch(url)
        let data = await response.json()
        const humidity = document.getElementsByClassName("humidity-percent")
        const wind = document.getElementsByClassName("wind-rate")
        const temperature = document.getElementsByClassName("weather-temp")
        const location = document.getElementsByClassName("weather-location")

        humidity[0].innerHTML = data.main.humidity+ " %"
        wind[0].innerHTML = Math.floor(data.wind.speed)+ " km/h"
        temperature[0].innerHTML = Math.floor(data.main.temp)+ "°c"
        location[0].innerHTML = data.name;

        if(data.weather[0].icon === "01d" || data.weather[0].icon === "01n")
        {
            setWicon(clear_icon)
        }
        else if (data.weather[0].icon === "02d" || data.weather[0].icon === "02n")
        {
            setWicon(cloud_icon)
        }
        else if (data.weather[0].icon === "03d" || data.weather[0].icon === "04n")
        {
            setWicon(drizzle_icon)
        }
        else if (data.weather[0].icon === "04d" || data.weather[0].icon === "04n")
        {
            setWicon(drizzle_icon)
        }
        else if (data.weather[0].icon === "09d" || data.weather[0].icon === "09n")
        {
            setWicon(rain_icon)
        }
        else if (data.weather[0].icon === "010d" || data.weather[0].icon === "010n")
        {
            setWicon(rain_icon)
        }
        else if (data.weather[0].icon === "13d" || data.weather[0].icon === "13n")
        {
            setWicon(snow_icon)
        }
        else
        {
            setWicon(clear_icon)
        }
    }

    return (
        <div className="container">
            <div className="top-bar">
                <input type="text" className="cityInput" placeholder="Search" />
                <div className="search-icon" onClick={()=>{search()}}>
                    <img src={search_icon} alt="search" />
                </div>
            </div>
            <div className="weather-image">
                <img src={wicon} alt="" />
            </div>
            <div className="weather-temp">24°c</div>
            <div className="weather-location">London</div>
            <div className="data-container">
                <div className="element">
                    <img src={humidity_icon} alt="" className='icon' />
                    <div className="data">
                        <div className="humidity-percent">64%</div>
                        <div className="text">Humidity</div>
                    </div>
                </div>
                <div className="element">
                    <img src={wind_icon} alt="" className='icon' />
                    <div className="data">
                        <div className="wind-rate">18 km/h</div>
                        <div className="text">Wind Speed</div>
                    </div>
                </div>
            </div>
        </div>
    )
}