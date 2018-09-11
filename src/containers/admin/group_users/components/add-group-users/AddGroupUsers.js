import React, { Component } from 'react';

class AddGroupUsers extends Component {
    constructor(props) {
        super(props);

    }

    componentWillMount() {

    }

    render() {
        return (
            <div className='col-lg-6 text-right'>
                <button
                    type="button"
                    className="btn btn-gradient-primary btn-fw"
                    onClick={this.showDrawer}
                >
                    Add Group Users
                </button>
                
            </div>
        );
    }

    showDrawer = () => {
        this.props.showDrawer(true);
    }
}

export default AddGroupUsers;