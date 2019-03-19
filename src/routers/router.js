import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Redirect, Switch } from "react-router-dom"
import Login from '../components/login/login'
import Home from '../components/home/home'
import Details from '../components/main/details'
import Cal from '../components/main/cal'
import Bmap from '../components/main/bmap'
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
                    <Route exact path="/cal" component={Cal} />
                    <Route exact path="/map" component={Bmap} />
                    <Redirect to="/login" />
                </Switch>
            </Router>
        )
    }
}

export default RouterCom 