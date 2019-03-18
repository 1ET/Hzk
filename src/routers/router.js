import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Redirect, Switch } from "react-router-dom"
import Login from '../components/login/login'
import Home from '../components/home/home'
import Details from '../components/main/details'

class RouterCom extends Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }
    render() {
        return (
            <Router>
                <Switch>
                    <Route exact path="/login" component={Login} />
                    <Route exact path="/" component={Home} />
                    <Route exact path="/details" component={Details} />
                    <Redirect to="/login" />
                </Switch>
            </Router>
        )
    }
}

export default RouterCom 