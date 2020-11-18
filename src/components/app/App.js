import React, { Component } from 'react';
import { Provider, useSelector } from "react-redux";
import Header from '../layout/header';
import Login from '../user/login';
import Credit from '../pages/credit';
import Register from '../user/register';
import Account from '../user/account';
import Dashboard from "./Dashboard";
import Knowledge from "./Knowledge";
import Onboarding from "./Onboarding";
import store from "../../store";
import getLocalTimestamp from "../../utils/timeServices";
import "./reset.css";
import "./font-awesome.css";
import "../layout/layout.css";
import "./app.css";
// react-dom (what we'll use here)
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import "core-js/stable";
import "regenerator-runtime/runtime.js";
import jwt_decode from "jwt-decode";
import setJWTToken from '../../utils/setJWTToken';
import { SET_CURRENT_USER } from '../../actions/types'
import { logout } from "../../actions/userActions";
import SecureRoute from "../../utils/secureRoute";
import PublicRoute from "../../utils/publicRoute";

// Récupération du token stocker dans le local storage du navigateur
const jwtToken = localStorage.Token;
if (jwtToken) {
    setJWTToken(jwtToken); // On set les entetes par preventDefault
    const decodedToken = jwt_decode(jwtToken);
    store.dispatch({
        type: SET_CURRENT_USER,
        payload: decodedToken,
    })
    const currentTime = getLocalTimestamp();
    if (decodedToken.exp < currentTime) {
        store.dispatch(logout());
        window.location.href = "/";
    }
}




export default class App extends Component {

    render() {
        return (
            <Provider store={store}>
            <Router>
            <div>
                <Header />
                <main>
                    
                        <Route exact path="/credit" component={Credit} />
                        {
                            // Only Public route
                        }
                        <PublicRoute exact path="/" component={Login} />
                        <PublicRoute exact path="/login" component={Login} />
                        <PublicRoute exact path="/register" component={Register} />
                        
                        {
                            // Private route
                        }
                        <Switch>
                            <SecureRoute exact path="/dashboard" component={Dashboard}/>
                            <SecureRoute exact path="/knowledge/:knId" component={Knowledge}/>
                            <SecureRoute exact path="/account" component={Account}/>
                            <SecureRoute exact path="/perspective/:knId/add-knowledge" component={Onboarding}/>
                        </Switch>
                    
    
                </main>
                
            </div>
            </Router>
            </Provider>

        )
    }
}