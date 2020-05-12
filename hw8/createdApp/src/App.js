import React from 'react';
import './App.css';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import Home from './components/pages/home';
import Login from './components/pages/login';
import AuthContext from './contexts/authContext';
import AuthService from './services/authService';

export default function App() {

  return (
    <div>
      <AuthContext.Provider value={{
        getCurrentUser: AuthService.getCurrentUser, 
        setCurrentUser: AuthService.setCurrentUser,
      }}>
        <BrowserRouter>
          <Switch>
            <Route path="/home">
              <Home />
            </Route>
            <Route path="/login">
              <Login />
            </Route>
            <Redirect to="/login" />
          </Switch>
        </BrowserRouter>
      </AuthContext.Provider>
    </div>
  );
}
