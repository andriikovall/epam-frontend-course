export function getCookie(name) {
    try {
        return document.cookie.split(';')
        .map(c => c.trim())
        .filter(c => c.startsWith(name + '='))[0]
        .split('=')[1];
    } catch (err) {
        return null;
    }
}