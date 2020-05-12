import { getCookie } from '../heplers/cookie';

export default class AuthService {

    static async authenticate(login, password) {
        login = login.trim();
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const user = users.find(u => u.login === login && u.password === password);
                if (user) {
                    return resolve(user);
                } else {
                    reject(new Error('No user found'))
                }
            }, 1000);
        })
    }

    static getCurrentUser() {
        const rawUser = getCookie('user');
        try {
            return JSON.parse(rawUser);
        } catch (err) {
            return null;
        }
    }

    static setCurrentUser(user) {
        document.cookie = `user=${JSON.stringify(user)}`;
    }
}



const users = [
    { login: 'login', password: 'password', firstName: 'Andrii', lastName: 'Koval' },
    { login: 'login2', password: 'password2', firstName: 'Name2', lastName: 'lastName2' },
    { login: 'login3', password: 'password3', firstName: 'Name3', lastName: 'lastName3' },
]