import React, { useState, useContext, useEffect } from 'react'
import AuthContext from '../../contexts/authContext';
import { Redirect } from 'react-router';
import Loader from '../loader';
import WeatherService from '../../services/weatherService';
import { getCurrentGeoLocationCoordinates } from '../../heplers/geoLocation';
import DayWeather from '../dayWeather';


export default function Home(props) {
    const { getCurrentUser } = useContext(AuthContext);
    const [weatherLoading, setWeatherLoading] = useState(true);
    const [currentWeather, setCurrentWether] = useState(null);
    const [currentDaySelectedIndex, setCurrentDaySelectedIndex] = useState(0);
    // London
    const defautLocationId = 44418;

    useEffect(() => {
        getCurrentGeoLocationCoordinates()
        .then(coords => WeatherService.getWeatherForPosition(coords.latitude, coords.longitude))
        .catch(err => WeatherService.getWeatherForLocation(defautLocationId))
        .then(res => setCurrentWether(res))
        .catch(err => {
            alert('An error occured while loading the weather')
        })
        .then(() => setWeatherLoading(false))
    }, []);


    if (!getCurrentUser()) {
        return <Redirect to="/login" />
    }

    function onDayCLick(index) {
        setCurrentDaySelectedIndex(index);
    }


    return (
        <div className="p-2 bg-info">
            <h1 className="text-center text-white">Welcome {getCurrentUser().firstName} {getCurrentUser().lastName} </h1>
            {weatherLoading ?
                <div className="card">
                    <Loader />
                </div>
                :
                <section className="card">
                    <DayWeather weather={currentWeather.consolidated_weather[currentDaySelectedIndex]}
                        sunRise={currentWeather.sun_rise}
                        sunSet={currentWeather.sun_set}
                        title={currentWeather.title}
                        expanded={true} />
                </section>
            }
            <div className="days-container my-2">
                {weatherLoading ?
                    <div className="card"> <Loader /> </div> :
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
