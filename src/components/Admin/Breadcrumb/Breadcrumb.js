import React, { Component } from 'react';

class Breadcrumb extends Component {
    constructor(props) {
        super(props);

    }

    /**
     * @name string
     * @icon string
     */

    render() {
        let name = this.props.name;
        let icon = this.props.icon;
        return (
            <div className="page-header">
                <h3 className="page-title">
                    <span className="page-title-icon bg-gradient-primary text-white mr-2">
                        <i className={icon?icon:'mdi mdi-alert'} aria-hidden="true"></i>
                    </span>
                    {name ? name : 'Breadcrumb'}
                </h3>
                <nav id="Edit-Group-User" aria-label="breadcrumb">
                    <ul className="breadcrumb">
                        <li className="breadcrumb-item active" aria-current="page">
                            <span></span>Overview
                                    <i className="mdi mdi-alert-circle-outline icon-sm text-primary align-middle"></i>

                        </li>
                    </ul>
                </nav>
            </div>
        );
    }
}


export default Breadcrumb;