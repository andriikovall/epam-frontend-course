import React from 'react';
import { BrowserRouter, Switch, Route, Link, Redirect } from 'react-router-dom';
import Home from './components/pages/home';
import Login from './components/pages/login';

import './app.css';

const App = (props) => {
    return (
        <>
            <Link to="/home">Home</Link>
            <Link to="/login">Login</Link>
            <Switch>
                <Route path="/home" component={Home} />
                <Route path="/login" component={Login} />
                <Redirect to="/login" />
            </Switch>
        </>
    )
}


export default App;