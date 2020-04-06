const getRequest = (url, query = {}) => {
    return new Promise((resolve, reject) => {

        const xmlhttp = new XMLHttpRequest();
        const queryString = Object.entries(query)
            .map(([key, value]) => encodeURIComponent(key) + '=' + encodeURIComponent(value))
            .join('&');
        if (url.endsWith('/'))
            url = url.slice(0, url.length - 1);

        xmlhttp.open('GET', url + (queryString === '' ? '' : '?') + queryString, true);
        xmlhttp.onreadystatechange = () => {
            if (xmlhttp.readyState == 4) { 
                if (xmlhttp.status == 200)
                    resolve(xmlhttp.responseText);
                else if (xmlhttp.status >= 400)
                    reject(xmlhttp.responseText);

            }
        }
        xmlhttp.send(null);
    })
}



export const getUsersImages = (count) => {
    if (typeof count !== 'number' || count < 0) {
        Promise.reject(count);
    }

    const apiUrl = 'https://randomuser.me/api/';

    return getRequest(apiUrl, { results: count })
            .then(res => JSON.parse(res))
            .then(res => res.results.map(user => user.picture));
}
 