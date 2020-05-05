import React, { useState, useContext } from 'react';
import { useForm } from 'react-hook-form';
import Loader from '../loader';
import AuthService from '../../services/authService';
import AuthContext from '../../contexts/authContext';
import { useHistory } from 'react-router';


export default function Login(props) {
    const { register, handleSubmit, errors } = useForm();
    
    const history = useHistory();

    const [ loginLoading, setLoginLoading ] = useState(false);
    const [ invalidCredentials, setInvalidCredentials ] = useState(false);
    const [ canShowFeedback, setCanShowFeedback ] = useState(false); 

    const { setCurrentUser } = useContext(AuthContext);

    const onSubmit = ({login, password}) => { 
        setLoginLoading(true);
        setCanShowFeedback(false);
        AuthService.authenticate(login, password)
            .then(user => {
                setCurrentUser(user);
                setInvalidCredentials(false);
                setTimeout(() => history.push('/home'), 1000);
            })
            .catch(() => {
                setInvalidCredentials(true);
            })
            .then(() => {
                setCanShowFeedback(true);
                setLoginLoading(false);
            })
    }

    return (
        <div className="wrapper bg-info d-flex justify-content-around flex-column">
            <section className="container p-3 login-form-section card">
                <form className="form" onSubmit={handleSubmit(onSubmit)}>
                    <div className="form-group">
                        <label htmlFor="login">Login</label>
                        <input type="text" className="form-control"  disabled={loginLoading}
                        ref={register({
                            required: 'Login is required', 
                            minLength: {
                                value: 3, 
                                message: 'Min length is 3'
                            }
                        })} name="login" id="login"></input>
                        <div className="text-danger">{errors.login?.message}</div>
                    </div>
                    
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input type="password" name="password" id="password" disabled={loginLoading}
                        className="form-control"
                        ref={register({
                            required: 'Password is required', 
                            minLength: {
                                message: 'Password min length is 3', 
                                value: 3
                            }
                        })}></input>
                        <div className="text-danger">{errors.password?.message}</div>
                    </div>
                    <div className="d-flex">
                    <button className="btn btn-primary" disabled={loginLoading}>{loginLoading ?
                                                                                <Loader />  : 
                                                                                'Submit'}</button>
                    <p className="text-danger ml-2">{canShowFeedback && invalidCredentials ? "Can't find user with this login and password" : ''}</p>
                    <p className="text-success ml-2">{canShowFeedback && !invalidCredentials ? 'Welcome, you will be redirected soon!' : ''}</p>
                    </div>
                </form>
            </section>
        </div>
    )
}