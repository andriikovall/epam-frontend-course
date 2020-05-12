import corsPrefix from '../heplers/corsPrefix';

const apiBaseUrl = 'https://www.metaweather.com/';

export default class WeatherService {
    static getWeatherForLocation(id) {
        return fetch(corsPrefix + apiBaseUrl + 'api/location/' + encodeURIComponent(id))
               .then(res => res.json());
    } 

    static async getWeatherForPosition(latt, long) {
        const url = new URL(corsPrefix + apiBaseUrl + 'api/location/search/');
        url.search = new URLSearchParams([[ 'lattlong', `${latt},${long}`]]);
        const response = await (await fetch(url)).json();
        const locationId = response[0].woeid;
        return WeatherService.getWeatherForLocation(locationId);
    }

    static getSmallWeatherStateImageUrl(state) {
        return `${apiBaseUrl}/static/img/weather/${state}.svg`;
    }

    static getBigWeatherStateImageUrl(state) {
        return `${apiBaseUrl}/static/img/weather/png/${state}.png`;
    }

    static get
}