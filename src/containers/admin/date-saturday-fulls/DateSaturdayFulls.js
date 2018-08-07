import React, { Component } from 'react';
import WithLayoutAdmin from '../../../components/Admin/WithLayout/WithLayoutAdmin';
import './style.css';
import { Spin, message } from 'antd';
import AddDateSaturdayFulls from '../date-saturday-fulls/components/AddDateSaturdayFulls';
import ListDateSaturdayFull from '../date-saturday-fulls/components/ListDateSaturdayFull';
import Session from '../../../utils/Session';
import handleException from '../../../utils/handleException';
import { getListGroupUsers } from '../../../modules/groupusers';
import * as CONST from '../../../config/constant';
import { createDateSaturdayFulls } from '../../../modules/dateSaturdayFulls';


class DateSaturdayFulls extends Component {
    constructor(props) {
        super(props)
        this.state = {
            date: [],
            valueDate: undefined,
            error: {},
            isSubmit: false,
            isLoading: true,
            dataGroupUsers: [],
            groupUsersId: []

        }
    }

    componentDidMount() {
        this.callApiGetListGroupUsers()
    }


    render() {
        return (
            <div className="content-wrapper">
                <Spin spinning={this.state.isLoading} tip="Loading...">
                    <div className="page-header">
                        <h3 className="page-title">
                            <span className="page-title-icon bg-gradient-primary text-white mr-2">
                                <i className="mdi mdi-email"></i>
                            </span>
                            Working Whole Saturday
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

                    <div className="row ">
                        <div className="col-12 grid-margin stretch-card">
                            <div className="card">
                                <div className="card-body">
                                    <h4 className="card-title">Working whole saturday</h4>
                                    <p className="card-description"> Click <code className="code-create"><i className="mdi mdi-account-multiple-plus"></i> Create Now !</code></p>
                                    <div className="forms-sample">
                                        <AddDateSaturdayFulls
                                            dataGroupUsers={this.state.dataGroupUsers}
                                            onChange={this.onChange}
                                            onBlur={this.onBlur}
                                            onFocus={this.onFocus}
                                            groupUsersId={this.state.groupUsersId}
                                            date={this.state.date}
                                            error={this.state.error}
                                            onChangeDatePicker={this.onChangeDatePicker}
                                            valueDate={this.state.valueDate}
                                            removeDate={this.removeDate}
                                        />

                                        <div className="form-group">
                                            <button
                                                type="submit"
                                                onClick={this.submit}
                                                className="btn btn-gradient-primary mr-2"
                                                disabled={this.props.isSubmit}
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
                    <ListDateSaturdayFull

                    />
                </Spin>
            </div>
        );
    }

    cancel = () => {
        this.setState({
            date: [],
            valueDate: undefined,
            error: {},
            isSubmit: false,
            isLoading: false,
            groupUsersId: []
        })
    }

    submit = () => {
        // if (!this.isValid()) return;
        let access_token = Session.get().token.access_token;
        let data = {
            access_token: access_token,
            inputs: this.convertData()
        }
        createDateSaturdayFulls(data).then(res => {
            let data = res.data;
            if (data.state === 1) {
                this.error();
            }
            this.success();
        }).catch(e => {
            handleException(e).next();

        })
    }

    success = () => {
        message.success('Create success');
    };

    error = () => {
        message.error('Create error');
    };

    convertData = () => {
        let groupUsersId = this.state.groupUsersId;
        let date = this.state.date;
        let data = [];
        for (let i = 0; i < groupUsersId.length; i++) {
            data.push({ id_group_users: groupUsersId[i], date_saturday_fulls: JSON.stringify(date) })
        }

        return data;
    }

    onChangeDatePicker = (name, arrayDate, valueDate) => {
        this.setState({
            [name]: arrayDate,
            valueDate: valueDate
        })
    }

    onChange = (name, value) => {
        this.setState({
            [name]: value
        })
    }

    onBlur = (name = null, value) => {
        this.setState({
            error: value
        })
    }

    onFocus = (name = null, value) => {
        this.setState({
            error: value
        })
    }

    removeDate = (name, arrayDate, valueDate, error) => {
        this.setState({
            [name]: arrayDate,
            valueDate: valueDate,
            error: error
        })
    }

    callApiGetListGroupUsers = () => {
        let access_token = Session.get().token.access_token;
        let data = {
            access_token: access_token
        }

        getListGroupUsers(data).then(res => {
            this.setState({
                isLoading: false,
                dataGroupUsers: res.data.data,
            });
        }).catch(e => {
            return;
            handleException(e).next();
        })
    }

    isValid = () => {
        let groupUsersIdNew = this.state.groupUsersId;
        let dateNew = this.state.date;
        let status = true;
        let error = this.state.error;
        if (dateNew.length <= 0) {
            error.date = 'error';
            status = false;
        }

        if (groupUsersIdNew.length <= 0) {
            error.groupUsersId = 'error';
            status = false;
        }

        this.setState({
            error: error
        })

        return status
    }

}

export default WithLayoutAdmin(DateSaturdayFulls);