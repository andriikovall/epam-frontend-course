import React, { useState, useContext } from 'react'
import AuthContext from '../../contexts/authContext';
import { Redirect } from 'react-router';
import Loader from '../loader';
import WeatherService from '../../services/weatherService';
import { getCurrentGeoLocationCoordinates } from '../../heplers/geoLocation';


export default function Home(props) {
    const { getCurrentUser } = useContext(AuthContext);
    const [ weatherLoading, setWeatherLoading ] = useState(true);
    const [ currentWeather, setCurrentWether ] = useState(null);

    if (!getCurrentUser()) {
        return <Redirect to="/login"/>
    }

    console.log('currentWeather:', currentWeather)
    if (!currentWeather) {
        getCurrentGeoLocationCoordinates()
            .then(coords => WeatherService.getWeatherForPosition(coords.latitude, coords.longitude))
            .then(res => setCurrentWether(res))
            .catch(err => {
                console.log(err);
            })
            .then(() => setWeatherLoading(true));
    }

    return (
        <div className="wrapper p-2 bg-info">
            <h1 className="text-center text-white">Welcome {getCurrentUser().firstName} {getCurrentUser().lastName} </h1>
            <section className="card">
                {weatherLoading ? <Loader /> : ''}
            </section>
        </div>
    )
}
