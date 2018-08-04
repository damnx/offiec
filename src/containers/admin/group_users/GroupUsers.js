import React, { Component } from 'react';
import './style.css';
import WithLayoutAdmin from '../../../components/Admin/WithLayout/WithLayoutAdmin';
import { Input, Select, Spin, message } from 'antd';
import Session from '../../../utils/Session';
import handleException from '../../../utils/handleException';
import { createGroupUsers, getListGroupUsers } from '../../../modules/groupusers';
import * as CONST from '../../../config/constant';
import ButtomUpdateGroupUsers from './components/buttom-update-group-users/ButtomUpdateGroupUsers';
import ListGroupUser from './components/list-group-users/ListGroupUser'

const Option = Select.Option;



class GroupUsers extends Component {
    constructor(props) {
        super(props)
        this.state = {
            name: undefined,
            status: 'public',
            error: {},
            isSubmit: false,
            dataGroupUsers: {},
            page: 1,
            total: 0,
            current_page: 0,
            isLoading: false,
            isUpdate: false
        }
    }

    componentDidMount() {
        this.apiGetListGroupUsers(this.state.page)
    }

    render() {
        let error = this.state.error;
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
                                <div className='card-body'>
                                    <div className='App'>
                                        <h4 className="card-title">{this.state.isUpdate ? 'Update ' : 'Add '} Group Users</h4>
                                        <p className="card-description"> Click <code className='code-create' onClick={this.onClickCreate}><i className='mdi mdi-account-multiple-plus'></i> Create Group Users Now !</code></p>
                                        <div className="md-form">
                                            <div className="file-field">
                                                <div className='form-group'>
                                                    <label>Name Group Users <span className='error-span'>*</span></label>
                                                    <Input
                                                        placeholder="Name Group"
                                                        size="large"
                                                        value={this.state.name}
                                                        onChange={(e) => this.onChange('name', e.target.value)}
                                                        onBlur={(e) => this.onBlur('name', e.target.value)}
                                                        onFocus={(e) => this.onFocus('name', e.target.value)}
                                                        className={error && error['name'] ? 'error-input' : ''}
                                                    />
                                                    {error && error['name'] ? <label className='error-label' >{error['name']} <span className='error-span'>*</span></label> : ''}
                                                </div>
                                                <div className='form-group'>
                                                    <label>Name Group Users <span className='error-span'>*</span></label>
                                                    <Select
                                                        style={{ width: '100%' }}
                                                        size="large"
                                                        value={this.state.status}
                                                        onChange={(value) => this.onChange('status', value)}
                                                    >
                                                        <Option value="public">Public</Option>
                                                        <Option value="pending">Pending</Option>
                                                    </Select>
                                                </div>
                                                {this.state.isUpdate &&
                                                    <ButtomUpdateGroupUsers
                                                        data={this.state.dataGroupUsers[this.state.isUpdate]}
                                                        onChangeUpdate={this.onChangeUpdate}
                                                        status={this.state.status}
                                                        isSubmit={this.state.isLoading}
                                                        error={this.state.error}
                                                        name={this.state.name}
                                                    />
                                                }
                                                {!this.state.isUpdate &&
                                                    <div className="form-group">
                                                        <button
                                                            type="submit"
                                                            onClick={this.submit}
                                                            className="btn btn-gradient-primary mr-2"
                                                            disabled={this.state.isSubmit}
                                                        >
                                                            Submit
                                                   </button>

                                                        <button
                                                            className="btn btn-light"
                                                            onClick={this.cancel}
                                                        >
                                                            Cancel
                                                   </button>
                                                    </div>
                                                }
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <ListGroupUser
                            dataGroupUsers={this.state.dataGroupUsers}
                            total={this.state.total}
                            current_page={this.state.current_page}
                            onChange={this.onChangePaginate}
                            onClickUpdate={this.onClickUpdate}
                            onClickDelete={this.onClickDelete}
                        />
                    </div>
                </Spin>
            </div>
        );
    }

    onChangeUpdate = (isLoading, data = null, error = null) => {
        let dataGroupUsers = this.state.dataGroupUsers;
        let isUpdate = this.state.isUpdate;
        let errorStat = this.state.error;
        if (data) {
            dataGroupUsers[isUpdate] == data
        }
        if (error) {
            errorStat = error;
        }
        this.setState({
            isLoading: isLoading,
            dataGroupUsers: dataGroupUsers,
            error: errorStat
        })
    }

    onClickUpdate = (isKey) => {
        let data = this.state.dataGroupUsers[isKey];
        this.setState({
            isUpdate: isKey,
            name: data.name,
            status: data.status,
            error: {},
            isSubmit: false,
        })
    }

    onClickCreate = () => {
        this.setState({
            name: undefined,
            status: 'public',
            error: {},
            isSubmit: false,
            isLoading: false,
            isUpdate: undefined
        })
    }

    apiGetListGroupUsers = (page) => {
        this.setState({
            isLoading: true,
        })
        let access_token = Session.get().token.access_token;
        let data = {
            'access_token': access_token,
            'page_size': CONST.PAGE_SIZE,
            'page': page
        }

        getListGroupUsers(data).then(res => {
            let data = res.data.data;
            this.setState({
                isLoading: false,
                dataGroupUsers: this.convertDateArraytoObject(data.data),
                total: data.total,
                current_page: data.current_page
            })

        }).catch(e => {
            handleException(e).next();
        })
    }

    onChangePaginate = (page, pageSize) => {
        this.apiGetListGroupUsers(page)
    }

    submit = () => {
        if (!this.isValid()) return
        let access_token = Session.get().token.access_token;
        let data = {
            access_token: access_token,
            data: {
                'name': this.state.name,
                'status': this.state.status
            }
        }

        createGroupUsers(data).then(res => {

            this.setState({
                isSubmit: true,
                isLoading: true
            })

            let data = res.data;
            let error = this.state.error;
            let dataGroupUsers = this.state.dataGroupUsers;
            this.error()
            if (data.status === 1) {
                for (let i in data.error) {
                    error[i] = data.error[i]
                }
                this.setState({
                    error: error,
                    isSubmit: false,
                    isLoading: false
                })
            } else {
                let data = res.data.data;
                dataGroupUsers["G-id-" + res.data.data.id] = data;
                dataGroupUsers["G-id-" + res.data.data.id]['user_count'] = 0
                this.success()
                this.setState({
                    dataGroupUsers: dataGroupUsers,
                    isSubmit: false,
                    total: this.state.total + 1,
                    isLoading: false
                })
            }
        }).catch(e => {
            this.setState({
                isSubmit: false
            })
            handleException(e).next();
        })
    }

    success = () => {
        message.success('Create Group Users success');
    };

    error = () => {
        message.error('Create Group Users error');
    };

    cancel = () => {
        this.setState({
            name: undefined,
            status: 'public',
            error: {},
            isSubmit: false
        })
    }

    onChange = (name, value) => {
        this.setState({
            [name]: value
        })
    }

    onBlur = (name, value) => {
        let error = this.state.error;
        if (value === '' || value === undefined) {
            error[name] = 'Sorry, please enter a valid name';
        }

        this.setState({
            ...this.state,
            error: error
        })
    }

    onFocus = (name, value) => {
        let error = this.state.error;
        delete error[name];
        this.setState({
            ...this.state,
            error: error
        })
    }

    isValid = () => {
        let error = this.state.error;
        let state = this.state;
        let status = true;
        if (state['name'] === '' || state['name'] === undefined) {
            status = false;
            error['name'] = 'Sorry, please enter a valid name';
        }

        this.setState({
            ...this.state,
            error: error
        })

        return status;
    }

    convertDateArraytoObject = (data) => {
        let result = {};
        for (let i = 0; i < data.length; i++) {
            result['G-id-' + (data[i].id)] = data[i];
        }
        return result
    }

}

export default WithLayoutAdmin(GroupUsers);