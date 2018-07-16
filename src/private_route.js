import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

class private_route extends Component {
    render() {
        let Component = this.props.component
        return (
            <div>
                <Component session={this.state.session} {...this.props} />
            </div>
        );
    }
}

export default private_route;