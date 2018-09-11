import React, { Component } from 'react';
import './style.css';
import WithLayoutAdmin from '../../../components/Admin/WithLayout/WithLayoutAdmin';
import { Spin } from 'antd';
import Session from '../../../utils/Session';
import handleException from '../../../utils/handleException';
import * as CONST from '../../../config/constant';
import ListGroupUser from './components/list-group-users/ListGroupUser';
import AddGroupUsers from './components/add-group-users/AddGroupUsers';
import CreateOrPpdateGroupUsers from './components/create-or-update-group-users/CreateOrPpdateGroupUsers';
import Breadcrumb from '../../../components/Admin/Breadcrumb';
import { getListGroupUsersPaginate } from '../../../modules/groupusers';


class GroupUsers extends Component {
    constructor(props) {
        super(props)
        this.state = {
            dataGroupUsers: {},
            page: 1,
            total: 0,
            currentPage: 0,
            isLoading: false,
            visible: false,
            inputs: {
                name: undefined,
                status: undefined,
                description: ''
            },
            id: undefined
        }
    }

    componentDidMount() {
        this.cellApiGetListGroupUsers(this.state.page);
    }

    render() {
        return (
            <div className="content-wrapper">
                <Spin tip="Loading..." spinning={this.state.isLoading}>
                    <Breadcrumb
                        name='Group Users'
                        icon='mdi mdi-account-multiple-plus'
                    />
                    <div className='row'>
                        <div className='col-12 grid-margin'>
                            <div className='card'>
                                <div className="card-body">
                                    <div className='row'>
                                        <div className='col-lg-6'>
                                            <h4 className="card-title">List Group Users</h4>
                                        </div>
                                        <AddGroupUsers
                                            showDrawer={this.showDrawer}
                                        />
                                    </div>
                                    <ListGroupUser
                                        dataGroupUsers={this.state.dataGroupUsers}
                                        total={this.state.total}
                                        currentPage={this.state.currentPage}
                                        onChange={this.onChangePaginate}
                                        isLoading={this.state.isLoading}
                                        page={this.state.page}
                                        cellApiGetListGroupUsers={this.cellApiGetListGroupUsers}
                                        onClickUpdate={this.onClickUpdate}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <CreateOrPpdateGroupUsers
                        visible={this.state.visible}
                        onCloseDrawer={this.onCloseDrawer}
                        inputs={this.state.inputs}
                        onChange={this.onChangeAddGroupUsers}
                        cellApiGetListGroupUsers={this.cellApiGetListGroupUsers}
                        page={this.state.page}
                        id={this.state.id}
                    />
                </Spin>
            </div>
        );
    }

    onClickUpdate = (data) => {
        this.setState({
            visible: true,
            inputs: {
                name: data['name'],
                status: data['status'],
                description: data['description']
            },
            id: data['id']
        })
    }

    showDrawer = () => {
        this.setState({
            visible: true,
            inputs: {
                name: undefined,
                status: undefined,
                description: ''
            },
            id: undefined
        });
    }

    onCloseDrawer = () => {
        this.setState({
            visible: false,
        });
    }

    onChangeAddGroupUsers = (name, value) => {
        this.setState({
            ...this.state,
            [name]: value
        })
    }

    cellApiGetListGroupUsers = (page) => {
        let access_token = Session.get().token.access_token;
        let data = {
            access_token: access_token,
            page: page,
            pageSize: CONST.PAGE_SIZE
        }
        this.setState({
            isLoading: true
        })
        getListGroupUsersPaginate(data).then(res => {
            this.setState({
                isLoading: false,
                dataGroupUsers: res.data.data.data,

            });
        }).catch(e => {
            handleException(e).next();
        })
    }
}

export default WithLayoutAdmin(GroupUsers);