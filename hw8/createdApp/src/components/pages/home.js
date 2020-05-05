import React, { useState, useContext } from 'react'
import AuthContext from '../../contexts/authContext';
import { Redirect } from 'react-router';
import Loader from '../loader';
import WeatherService from '../../services/weatherService';
import { getCurrentGeoLocationCoordinates } from '../../heplers/geoLocation';
import DayWeather from '../dayWeather';


export default function Home(props) {
    const { getCurrentUser } = useContext(AuthContext);
    const [ weatherLoading, setWeatherLoading ] = useState(true);
    const [ currentWeather, setCurrentWether ] = useState(null);
    const [ currentDaySelectedIndex, setCurrentDaySelectedIndex ] = useState(0);

    if (!getCurrentUser()) {
        return <Redirect to="/login"/>
    }

    function onDayCLick(index) {
        setCurrentDaySelectedIndex(index);
    }

    if (!currentWeather) {
        getCurrentGeoLocationCoordinates()
            .then(coords => WeatherService.getWeatherForPosition(coords.latitude, coords.longitude))
            .then(res => setCurrentWether(res))
            .catch(err => {
                console.log(err);
            })
            .then(() => setWeatherLoading(false));
    }

    return (
        <div className="p-2 bg-info">
            <h1 className="text-center text-white">Welcome {getCurrentUser().firstName} {getCurrentUser().lastName} </h1>
            <section className="card">
                {weatherLoading ? 
                <Loader /> : 
                <DayWeather  weather={currentWeather.consolidated_weather[currentDaySelectedIndex]} 
                                sunRise={currentWeather.sun_rise} 
                                sunSet={currentWeather.sun_set}
                                title={currentWeather.title}
                                expanded={true}/>}
            </section>
            <div className="days-container my-2">
                {weatherLoading ? 
                <Loader /> : 
                currentWeather.consolidated_weather.map((w, index) => (
                    <div className="card" key={index} onClick={() => onDayCLick(index)}>
                        <DayWeather weather={w} 
                                    title={currentWeather.title} />
                    </div>
                ))}
            </div>
        </div>
    )
}
