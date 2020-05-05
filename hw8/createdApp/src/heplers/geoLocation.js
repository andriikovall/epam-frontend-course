export function getCurrentGeoLocationCoordinates() {
    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition((pos) => {
            resolve(pos.coords);
        }, err => {
            reject(err);
        })
    })
}
