import React, { Component } from 'react';
import './style.css';
import WithLayoutAdmin from '../../../components/Admin/WithLayout/WithLayoutAdmin';
import { Input, Select, Pagination, Spin, Anchor } from 'antd';
import Session from '../../../utils/Session';
import handleException from '../../../utils/handleException';
import { createGroupUsers, getListGroupUsers } from '../../../modules/groupusers';
import * as CONST from '../../../config/constant';

const Option = Select.Option;
const { Link } = Anchor;


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
            isLoading: false
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
                                <i className="fa fa-file-excel-o" aria-hidden="true"></i>
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
                                        <h4 className="card-title">Add Group Users</h4>
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
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='col-12 grid-margin'>
                            <div className='card'>
                                <div className="card-body">
                                    <h4 className="card-title">List Group Users</h4>
                                    <div className='form-group'>
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
                                                {this.renderGroupUser()}
                                            </tbody>
                                        </table>
                                    </div>
                                    <div className='form-group text-right'>
                                        <Pagination
                                            size="small"
                                            pageSize={CONST.PAGE_SIZE}
                                            onChange={this.onChangePaginate}
                                            total={this.state.total}
                                            current={this.state.current_page}
                                            showQuickJumper
                                        />

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Spin>
            </div>
        );
    }

    renderGroupUser = () => {
        let data = this.state.dataGroupUsers;
        let result = []
        for (let i in data) {
            result.push(<tr key={i}>
                <td>{data[i].name}</td>
                <td className="text-danger"> {data[i].user_count} <i className="mdi mdi-account-check"></i></td>
                <td><label className={CONST.ENUM_GROUP_USERS_STATUS[data[i].status].className + ' badge'}>{CONST.ENUM_GROUP_USERS_STATUS[data[i].status].value}</label></td>
                <td className='text-right'>
                    <a
                        href="#Edit-Group-User"
                        className="btn btn-gradient-primary btn-icon-text btn-sm mr-2"
                    >
                        Edit
                          <i className="mdi mdi-file-check btn-icon-append"></i>
                    </a>

                    <a
                        type="button"
                        className="btn btn-gradient-danger btn-lg btn-sm"
                    >
                        btn-lg
                        <i className="mdi mdi-delete-forever"></i>
                    </a>
                </td>
            </tr >)
        }
        return result;
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
                isSubmit: true
            })

            let data = res.data;
            let error = this.state.error;
            let dataGroupUsers = this.state.dataGroupUsers;
            if (data.status === 1) {
                for (let i in data.error) {
                    error[i] = data.error[i]
                }
                this.setState({
                    error: error,
                    isSubmit: false
                })
            } else {
                let data = res.data.data;
                dataGroupUsers[res.data.data.id] = data;
                dataGroupUsers[res.data.data.id]['user_count'] = 0
                this.setState({
                    dataGroupUsers: dataGroupUsers,
                    isSubmit: false,
                    total: this.state.total + 1
                })
            }
        }).catch(e => {
            this.setState({
                isSubmit: false
            })
            handleException(e).next();
        })
    }



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
            result['G-id-'+(data[i].id)] = data[i];
        }
        return result
    }

}

export default WithLayoutAdmin(GroupUsers);