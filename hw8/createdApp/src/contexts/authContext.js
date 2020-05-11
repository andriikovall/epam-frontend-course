import React from 'react'

// Why doesn't work?
// import AuthService from '../services/authService';

// const getCurrentUser = () => {
//     return AuthService.getCurrentUser()
// }

// const setCurrentUser = (user) => {
//     AuthService.setCurrentUser(user);
//     console.log('setting user', user);
// }

// const AuthConetxt = React.createContext({
//     getCurrentUser,
//     setCurrentUser,
// });

const AuthConetxt = React.createContext();

export default AuthConetxt;