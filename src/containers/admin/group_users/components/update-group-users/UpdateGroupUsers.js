import React, { Component } from 'react';
import PropTypes from 'prop-types';

class UpdateGroupUsers extends Component {
    constructor(props) {
        super(props);

    }

    render() {
        return (
            <button
                className="btn btn-gradient-dark btn-icon-text btn-sm mr-2"
                type="submit"
                onClick={this.onClick}
            >
                Edit
              <i className="mdi mdi-file-check btn-icon-append"></i>
            </button>
        );
    }

    onClick = () => {
        let data = this.props.data;
        this.props.onClick(data);
    }
}

export default UpdateGroupUsers;