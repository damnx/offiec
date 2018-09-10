import React, { Component } from 'react';
import './style.css';
import WithLayoutAdmin from '../../../components/Admin/WithLayout/WithLayoutAdmin';
import { Spin } from 'antd';
import Session from '../../../utils/Session';
import handleException from '../../../utils/handleException';
import * as CONST from '../../../config/constant';
import ListGroupUser from './components/list-group-users/ListGroupUser'
import AddGroupUsers from './components/add-group-users/AddGroupUsers'


class GroupUsers extends Component {
    constructor(props) {
        super(props)
        this.state = {
            dataGroupUsers: {},
            page: 1,
            total: 0,
            current_page: 0,
            isLoading: false,
            visible: false
        }
    }

    componentDidMount() {

    }

    render() {
        return (
            <div className="content-wrapper">
                <Spin tip="Loading..." spinning={this.state.isLoading}>
                    <div className="page-header">
                        <h3 className="page-title">
                            <span className="page-title-icon bg-gradient-primary text-white mr-2">
                                <i className="mdi mdi-account-multiple-plus" aria-hidden="true"></i>
                            </span>
                            Group Users
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
                    <div className='row'>
                        <div className='col-12 grid-margin'>
                            <div className='card'>
                                <div className="card-body">
                                    <div className='row'>
                                        <div className='col-lg-6'>
                                            <h4 className="card-title">List Group Users</h4>
                                        </div>
                                        <div className='col-lg-6 text-right'>
                                            <button
                                                type="button"
                                                className="btn btn-gradient-primary btn-fw"
                                                onClick={this.showDrawer}
                                            >
                                                Add Group Users
                                            </button>
                                        </div>
                                    </div>
                                    <ListGroupUser
                                        dataGroupUsers={this.state.dataGroupUsers}
                                        total={this.state.total}
                                        currentPage={this.state.current_page}
                                        onChange={this.onChangePaginate}
                                        isLoading={this.state.isLoading}
                                        page={this.state.page}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <AddGroupUsers
                        visible={this.state.visible}
                        onCloseDrawer={this.onCloseDrawer}
                    />
                </Spin>
            </div>
        );
    }

    showDrawer = () => {
        this.setState({
            visible: true,
        });
    }

    onCloseDrawer = () => {
        this.setState({
            visible: false,
        });
    }
}

export default WithLayoutAdmin(GroupUsers);