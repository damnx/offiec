import React, { Component } from 'react';
import WithLayoutAdmin from '../../../components/Admin/WithLayout/WithLayoutAdmin';
import './style.css';
import { Pagination } from 'antd';

class Inbox extends Component {
    constructor(props) {
        super(props)
        this.state = {
         
        }
    }
   

    render() {
        return (
            <div className="content-wrapper">
                <div className="page-header">
                    <h3 className="page-title">
                        <span className="page-title-icon bg-gradient-primary text-white mr-2">
                            <i className="mdi mdi-home"></i>
                        </span>
                        Inbox
                    </h3>
                    <nav aria-label="breadcrumb">
                        <ul className="breadcrumb">
                            <li className="breadcrumb-item active" aria-current="page">
                                <span></span>Overview
                                <i className="mdi mdi-alert-circle-outline icon-sm text-primary align-middle"></i>
                            </li>
                        </ul>
                    </nav>
                </div>

                <div id='tabs-inbox' className="row ">
                    <div className="col-12 grid-margin">
                        <div className='card'>
                            <div className='card-body'>
                                <div className='row'>
                                    <div className='col-md-6 col-6-title-dam'>
                                        <div className="custom-control custom-checkbox custom-checkbox-damnx">
                                            <input type="checkbox" className="custom-control-input" id="customCheck1" />
                                            <label id='custom-control-label-damnx' className="custom-control-label" htmlFor="customCheck1">Check All</label>
                                        </div>
                                        <div style={{ float: 'left', marginTop: '-5px' }} className='custom-control'>
                                            <i className='mdi mdi-reload mdi-reload-damnx-inbox'></i>
                                        </div>
                                    </div>
                                    <div className='col-md-5 pagination-inbox-dam'>
                                        <Pagination simple defaultCurrent={2} total={50} />
                                    </div>
                                </div>
                                <table id='' className="table table-hover">
                                    {/* <thead>
                                                <tr>
                                                    <th className='text-center'>#</th>
                                                    <th>First name
                                                    </th>
                                                    <th> Progress</th>
                                                    <th>Amount</th>
                                                    <th>Deadline</th>
                                                </tr>
                                            </thead> */}
                                    <tbody>
                                        <tr className='tr-table-inbox'>
                                            <td style={{ width: '20%' }}>
                                                <div className="custom-control custom-checkbox custom-checkbox-damnx">
                                                    <input type="checkbox" className="custom-control-input" id="customCheck1" />
                                                    <label id='custom-control-label-damnx' className="custom-control-label" htmlFor="customCheck1"></label>
                                                </div>
                                                <i className='mdi mdi-heart-outline mdi-text-left'></i>
                                            </td>
                                            <td style={{ width: '20%' }}> Herman Beck</td>
                                        </tr>
                                        <tr>
                                            <td style={{ width: '20%' }}>
                                                <div className="custom-control custom-checkbox custom-checkbox-damnx">
                                                    <input type="checkbox" className="custom-control-input" id="customCheck1" />
                                                    <label id='custom-control-label-damnx' className="custom-control-label" htmlFor="customCheck1"></label>
                                                </div>
                                                <i className='mdi mdi-heart mdi-text-left'></i>
                                            </td>
                                            <td style={{ width: '80%' }}>Herman Beck</td>
                                        </tr>
                                        <tr className='tr-table-inbox'>
                                            <td style={{ width: '20%' }}>
                                                <div className="custom-control custom-checkbox custom-checkbox-damnx">
                                                    <input type="checkbox" className="custom-control-input" id="customCheck1" />
                                                    <label id='custom-control-label-damnx' className="custom-control-label" htmlFor="customCheck1"></label>
                                                </div>
                                                <i className='mdi mdi-heart-outline mdi-text-left'></i>
                                            </td>
                                            <td> Herman Beck</td>
                                        </tr>
                                        <tr className='tr-table-inbox'>
                                            <td style={{ width: '20%' }}>
                                                <div className="custom-control custom-checkbox custom-checkbox-damnx">
                                                    <input type="checkbox" className="custom-control-input" id="customCheck1" />
                                                    <label id='custom-control-label-damnx' className="custom-control-label" htmlFor="customCheck1"></label>
                                                </div>
                                                <i className='mdi mdi-heart-outline mdi-text-left'></i>
                                            </td>
                                            <td style={{ width: '20%' }}> Herman Beck</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default WithLayoutAdmin(Inbox);