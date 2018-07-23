import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import PrivateRoute from '../private_route';
import Home from '../home/index';
import Login from '../login/Login';
import HomeAdmin from '../admin/home/index';
import 'font-awesome/css/font-awesome.min.css';


class index extends Component {
    render() {
        return (
            <Switch>
                {/* <PrivateRoute exact path="/test" name="Home" component={Home} /> */}
                <PrivateRoute exact path="/login.html" name="Login" component={Login} />
                <PrivateRoute exact path="/admin.html" name="Home Admin" component={HomeAdmin} />
                <Route exact path="/" component={Home} />
                <Redirect from="/" to="/" />
            </Switch>
        );
    }
}

export default index;