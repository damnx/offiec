import React, { Component } from 'react';

class private_route extends Component {
    constructor(props) {
        super(props)
        this.state = {
            session: []
        }
    }

    render() {
        let Component = this.props.component;
        return (
            <Component session={this.state.session} {...this.props} />
        );
    }
}

export default private_route;