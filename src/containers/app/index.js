import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import PrivateRoute from '../private_route';
import Home from '../home/index';
import Login from '../login/Login';
import Register from '../register/index';

import HomeAdmin from '../admin/home/index';
import UploadFile from '../admin/upload-file/index';
import Inbox from '../admin/inbox/Inbox';
import SentMail from '../admin/sent-mail/SentMail';

import SaturdayFulls from '../admin/date-saturday-fulls/DateSaturdayFulls';
import GroupUsers from '../admin/group_users/GroupUsers';
import CalendarWork from '../admin/calendar/Calendar';



import 'font-awesome/css/font-awesome.min.css';


class index extends Component {
    render() {
        return (
            <Switch>
                {/* <PrivateRoute exact path="/test" name="Home" component={Home} /> */}
                <Route exact path="/login.html" name="Login" component={Login} />
                <PrivateRoute exact path="/admin.html" name="Home Admin" component={HomeAdmin} />
                <Route exact path="/register.html" name="Upload File" component={Register} />
                <PrivateRoute exact path="/group-users.html" name="Group Users" component={GroupUsers} />
                <PrivateRoute exact path="/sent-mail.html" name="Sent Mail" component={SentMail} />
                <PrivateRoute exact path="/inbox.html" name="Upload File" component={Inbox} />
                <PrivateRoute exact path="/upload-file.html" name="Upload File" component={UploadFile} />
                <PrivateRoute exact path="/date-saturday-fulls.html" name="Date Saturday Fulls" component={SaturdayFulls} />
                <PrivateRoute exact path="/calendar-work.html" name="Calendar Work" component={CalendarWork} />
                <Route exact path="/" component={Home} />
                <Redirect from="/" to="/" />
            </Switch>
        );
    }
}

export default index;