import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import PrivateRoute from '../private_route';
import Home from '../home/index'


class index extends Component {
    render() {
        return (
            <Switch>
                <PrivateRoute exact path="/test" name="Home" component={Home} />
                <Route exact path="/acc" component={Home} />
                <Redirect from="/" to="/" />
            </Switch>
        );
    }
}

export default index;