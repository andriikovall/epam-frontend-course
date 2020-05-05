import corsPrefix from '../heplers/corsPrefix';

export default class WeatherService {
    static getWeatherForLocation(id) {
        return fetch(corsPrefix + 'https://www.metaweather.com/api/location/' + encodeURIComponent(id))
               .then(res => res.json());
    } 

    static async getWeatherForPosition(latt, long) {
        const url = new URL(corsPrefix + 'https://www.metaweather.com/api/location/search');
        url.search = new URLSearchParams([[ 'lattlong', `${latt},${long}`]]);
        const response = await (await fetch(url)).json();
        const locationId = response[0].woeid;
        return WeatherService.getWeatherForLocation(locationId);
    }
}