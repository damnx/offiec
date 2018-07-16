import React, { Component } from 'react';

class private_route extends Component {
    render() {
        let Component = this.props.component;
        return (
            <Component session={this.state.session} {...this.props} />
        );
    }
}

export default private_route;