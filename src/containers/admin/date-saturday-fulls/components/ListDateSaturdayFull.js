import React, { Component } from 'react';

class ListDateSaturdayFull extends Component {
    constructor(props) {
        super(props);

    }

    componentWillMount() {

    }

    componentDidMount() {

    }


    render() {
        return (
            <div className="row ">
                <div className="col-12 grid-margin stretch-card">
                    <div className="card">
                        <div className="card-body">
                            <h4 className="card-title">List working whole saturday</h4>
                            <div className="forms-sample">
                                <div className="form-group">
                                    <table className="table table-hover">
                                        <thead>
                                            <tr>
                                                <th>Name Group</th>
                                                <th>Number of Member</th>
                                                <th>Status</th>
                                                <th className='text-right'>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>12</td>
                                                <td>12</td>
                                                <td>12</td>
                                                <td>12</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default ListDateSaturdayFull;