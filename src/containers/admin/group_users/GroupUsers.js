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
import SearchGroupUsers from './components/search-group-users/SearchGroupUsers';
import { decodeUrl, encodeData } from '../../../utils';
import history from '../../../utils/history';

class GroupUsers extends Component {
    constructor(props) {
        super(props)
        let search = decodeUrl(props.location.search.substring(1));
        this.state = {
            dataGroupUsers: {},
            page: search && search['page'] ? Number(search['page']) : 1,
            total: 0,
            isLoading: false,
            visible: false,
            inputs: {
                name: undefined,
                status: undefined,
                description: ''
            },
            search: {
                name: search && search['name'] ? search['name'] : undefined,
                status: search && search['status'] ? search['status'] : undefined
            },
            id: undefined,
            pageSize: search && search['pageSize'] ? Number(search['pageSize']) : CONST.PAGE_SIZE,
        }
    }

    componentDidMount() {
        window.onpopstate = this.onBackButtonEvent;
        this.cellApiGetListGroupUsers(this.state.page);
    }

    onBackButtonEvent = () => {
        let search = decodeUrl(this.props.location.search.substring(1));
        this.setState({
            ...this.state,
            search: {
                name: search && search['name'] ? search['name'] : undefined,
                status: search && search['status'] ? search['status'] : undefined
            },
            pageSize: search && search['pageSize'] ? Number(search['pageSize']) : CONST.PAGE_SIZE,
            page: search && search['page'] ? Number(search['page']) : 1

        }, () => {
            this.cellApiGetListGroupUsers(this.state.page);
        })
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
                                        <AddGroupUsers
                                            showDrawer={this.showDrawer}
                                        />
                                    </div>
                                    <SearchGroupUsers
                                        search={this.state.search}
                                        onChangeSearchGroupUsers={this.onChangeSearchGroupUsers}
                                        cellApiGetListGroupUsers={this.cellApiGetListGroupUsers}
                                        page={this.state.page}
                                        pageSize={this.state.pageSize}
                                        onClickCancel={this.onClickCancel}

                                    />
                                    <ListGroupUser
                                        dataGroupUsers={this.state.dataGroupUsers}
                                        total={this.state.total}
                                        page={this.state.page}
                                        onChangePaginate={this.onChangePaginate}
                                        isLoading={this.state.isLoading}
                                        page={this.state.page}
                                        cellApiGetListGroupUsers={this.cellApiGetListGroupUsers}
                                        onClickUpdate={this.onClickUpdate}
                                        pageSize={this.state.pageSize}
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

    onChangeSearchGroupUsers = (name, value) => {
        this.setState({
            [name]: value
        })
    }

    onClickCancel = () => {
        this.setState({
            ...this.state,
            search: {
                name: undefined,
                status: undefined
            },
            page: 1
        }, () => {
            this.pushUrl()
            this.cellApiGetListGroupUsers(this.state.page);
        })
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

    onChangePaginate = (page, pageSize) => {
        this.setState({
            page: page,
            pageSize: pageSize
        }, () => {
            this.pushUrl()
            this.cellApiGetListGroupUsers(page);
        })
    }

    pushUrl = () => {
        let inputs = {
            name: this.state.search['name'],
            status: this.state.search['status'],
            page: this.state.page,
            pageSize: this.state.pageSize,

        };
        history.push({
            pathname: '/group-users.html',
            search: encodeData(inputs)
        })
    }

    cellApiGetListGroupUsers = (page) => {
        let access_token = Session.get().token.access_token;
        let data = {
            access_token: access_token,
            inputs: {
                name: this.state.search['name'],
                status: this.state.search['status'],
                page: page,
                pageSize: this.state.pageSize
            }
        }
        this.setState({
            isLoading: true
        }, () => {
            getListGroupUsersPaginate(data).then(res => {
                let data = res.data.data
                this.setState({
                    isLoading: false,
                    dataGroupUsers: data.data,
                    total: data.total,
                    pageSize: Number(data.per_page),
                    page: data.current_page
                });
            }).catch(e => {
                handleException(e).next();
            })
        })
    }
}

export default WithLayoutAdmin(GroupUsers);