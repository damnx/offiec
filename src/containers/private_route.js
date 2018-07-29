import React, { Component } from 'react';
import Session from '../utils/Session';
import permissions from '../config/permissions';
import { Redirect } from 'react-router-dom';

class private_route extends Component {
    constructor(props) {
        super(props)

        let session = Session.get();
        this.state = {
            hasPermission: this.hasPermission(),
            session: session
        }
    }

    hasPermission = () => {
        let session = Session.get();
        if (!session) return false;

        let userPermissions = session.user.data.permission;
        let path = this.props.path;
        let hasPermission = false;
        if (permissions[path] === undefined || session.user.data.is_sadmin) {
            hasPermission = true;
        } else {
            for (let i in userPermissions) {
                if (i.trim() === '') continue;
                if (permissions[path].indexOf(i) > -1) {
                    hasPermission = true;
                    break;
                }
            }
        }
        return hasPermission
    }

    render() {
        let self = this;
        if (!this.state.session) {
            return <Redirect
                to={{
                    pathname: "/login.html",
                    state: { from: self.props.location }
                }}
            />;
        } else {
            if (this.state.hasPermission ) {
                let Component = this.props.component
                return (
                    <Component session={this.state.session} {...this.props} />
                )
            } else {
                return (
                    <Redirect
                        to={{
                            pathname: "/",
                            state: { from: self.props.location }
                        }}
                    />
                )
            }
        }
    }
}

export default private_route;