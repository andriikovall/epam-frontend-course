import React from 'react'
import WeatherService from '../services/weatherService';
import moment from 'moment';

export default function DayWeather({ weather, sunRise, sunSet, title, expanded }) {
    console.log(new Date(sunRise).getDay());
    if (expanded) {
        return (
            <div className="p-3">
                <div className="d-flex align-items-center">
                    <h2>{title}</h2>
                    <div className="font-weight-bold ml-2">{moment(weather.applicable_date).format('MMM Do YYYY')}</div>
                </div>
                <div className="row p-3">
                    <div className="col-sm-6 col-md-2">
                        <img src={WeatherService.getBigWeatherStateImageUrl(weather.weather_state_abbr)}
                            alt={weather.weather_state_name}></img>
                    </div>
                    <div className="col-sm-5 col-lg-4 d-flex flex-column justify-content-around">
                        <table className="table table-borderless">
                            <tbody>
                                <tr>
                                    <th>State</th>
                                    <td>{weather.weather_state_name}</td>
                                </tr>
                                <tr>
                                    <th>Air pressure</th>
                                    <td>{weather.air_pressure}mm</td>
                                </tr>
                                <tr>
                                    <th>Humidity</th>
                                    <td>{weather.humidity}%</td>
                                </tr>
                                {
                                    new Date(sunRise).getDate() === new Date(weather.applicable_date).getDate() ? 
                                    <>
                                        <tr>
                                            <th>Sub rise</th>
                                            <td>{moment(sunRise).format('LTS')}</td>
                                        </tr>
                                        <tr>
                                            <th>Sub set</th>
                                            <td>{moment(sunSet).format('LTS')}</td>
                                        </tr>
                                    </>                                                :
                                    <></>
                                }
                            </tbody>
                        </table>
                    </div>

                    <div className="col d-flex flex-column justify-content-around">
                        <table className="table table-borderless">
                            <tbody>
                                <tr>
                                    <th>Min temperature</th>
                                    <td>{Math.round(weather.min_temp * 100) / 100}°C</td>
                                </tr>
                                <tr>
                                    <th>Max temperature</th>
                                    <td>{Math.round(weather.max_temp * 100) / 100}°C</td>
                                </tr>
                                <tr>
                                    <th>Wind speed</th>
                                    <td>{Math.round(weather.wind_speed * 100) / 100}mph</td>
                                </tr>
                                <tr>
                                    <th>Wind direction</th>
                                    <td>
                                        <img style={{'transform': `rotate(${weather.wind_direction - 90}deg)`}} 
                                        src="arrow.svg" className="wind-arrow-img" alt="direction arrow"/>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        )
    } else {
        return (
            <pre>{JSON.stringify({ weather, sunRise, sunSet, title }, null, 2)}</pre>
        )
    }
}
