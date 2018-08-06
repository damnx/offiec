import React, { Component } from 'react';
import WithLayoutAdmin from '../../../components/Admin/WithLayout/WithLayoutAdmin';
import './style.css';
import { Select, DatePicker, Input, Spin } from 'antd';
import * as CONST from '../../../config/constant';
import moment from 'moment';
import { getListUser } from '../../../modules/user';
import Session from '../../../utils/Session';
import handleException from '../../../utils/handleException';
import { getListGroupUsers } from '../../../modules/groupusers';

const { TextArea } = Input;
const Option = Select.Option;

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
            GroupUsersId: []

        }
    }

    componentDidMount() {
        this.callApiGetListGroupUsers()
    }


    render() {
        let error = this.state.error;
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
                                        <div className="form-group">
                                            <label >Group Users <span className='error-span'>*</span></label>
                                            <Select
                                                mode="multiple"
                                                size='large'
                                                placeholder="Group Users"
                                                // defaultValue={['a10', 'c12']}
                                                style={{ width: '100%' }}
                                                maxTagCount={1}
                                                showSearch
                                                optionFilterProp="label"
                                                onChange={(value) => this.onChangeUsername('GroupUsersId', value)}
                                                onBlur={(value) => this.onBlurUsername('GroupUsersId', value)}
                                                onFocus={(value) => this.onFocusUsername('GroupUsersId', value)}
                                                value={this.state.GroupUsersId}
                                                className={error && error['GroupUsersId'] ? 'error-input' : ''}
                                            >
                                                {this.renderSelectGroupUsers()}
                                            </Select>
                                            {error && error['GroupUsersId'] ? <label className='error-label' >Sorry, please enter a valid Username ? <span className='error-span'>*</span></label> : ''}
                                        </div>

                                        <div className="form-group">
                                            <label>Date rules <span className='error-span'>*</span></label>
                                            <DatePicker
                                                className={error && error['date'] ? 'error-input date-picker-rules' : 'date-picker-rules'}
                                                size='large'
                                                format={CONST.DATE_FORMAT_FOR_DISPLAY}
                                                onChange={(date, dateString) => this.onChangeDatePicker('date', date, dateString)}
                                                value={this.state.valueDate ? moment(this.state.valueDate, CONST.DATE_FORMAT_FOR_API) : undefined}
                                                onBlur={(date, dateString) => this.onBlurDatePicker('date', date, dateString)}
                                                onFocus={(date, dateString) => this.onFocusDatePicker('date', date, dateString)}
                                            />
                                            {error && error['date'] ? <label className='error-label' >Sorry, please enter a valid Date rules ? <span className='error-span'>*</span></label> : ''}
                                        </div>
                                        <div className="form-group">
                                            {this.renderTagRulesDate()}
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
                </Spin>
            </div>
        );
    }

    submit = () => {
        this.isValid();
        let inputs = {
            date: this.state.date,
            name: this.state.name,
            GroupUsersId: this.state.GroupUsersId
        }
        this.convertData();
    }

    convertData = () => {
        let GroupUsersId = this.state.GroupUsersId;
        let date = this.state.date;
        let data = [];
        for (let i = 0; i < GroupUsersId.length; i++) {
            data.push({ id_group_users: GroupUsersId[i], date_saturday_fulls: JSON.stringify(date) })
        }
        console.log(data);
    }

    cancel = () => {
        this.setState({
            date: [],
            name: undefined,
            valueDate: undefined,
            error: {},
            isSubmit: false,
            isLoading: false,
            dataGroupUsers: [],
            GroupUsersId: []
        })
    }


    renderTagRulesDate = () => {
        let date = this.state.date;
        let result = [];
        for (let i = 0; i < date.length; i++) {
            result.push(<span key={i} className="badge badge-pill badge-primary">{moment(date[i], CONST.DATE_FORMAT_FOR_API).format(CONST.DATE_FORMAT_FOR_DISPLAY)} <i onClick={() => this.removeDateRules(date[i])} className="fa fa-times fa-times-red " aria-hidden="true"></i></span>)
        }

        return result;
    }

    renderSelectGroupUsers = () => {
        let dataGroupUsers = this.state.dataGroupUsers;
        let children = [];
        for (let i = 0; i < dataGroupUsers.length; i++) {
            children.push(<Option key={i} label={dataGroupUsers[i].name + " - " + dataGroupUsers[i].user_count + " user"} value={dataGroupUsers[i].id}>{dataGroupUsers[i].name + " - " + dataGroupUsers[i].user_count + " user"}</Option>);
        }
        return children;
    }

    removeDateRules = (date) => {
        let dateNews = this.state.date;
        let index = dateNews.indexOf(date);
        if (index !== -1) dateNews.splice(index, 1);

        this.setState({
            date: dateNews,
            valueDate: undefined
        })
    }

    onChangeUsername = (name, value) => {
        this.setState({
            [name]: value
        })
    }

    onBlurUsername = (name, value) => {
        let error = this.state.error;
        if (value.length <= 0) {
            error[name] = 'error';
        }
        this.setState({
            error: error
        })
    }

    onFocusUsername = (name, value) => {
        let error = this.state.error;
        delete error[name];
        this.setState({
            error: error
        })
    }


    onChangeDatePicker = (name, date, dateString) => {
        let dateNews = this.state.date;
        if (!dateNews.includes(moment(date).format(CONST.DATE_FORMAT_FOR_API)) && date) {
            dateNews.push(moment(date).format(CONST.DATE_FORMAT_FOR_API));
        }
        this.setState({
            ...this.state,
            [name]: dateNews,
            valueDate: dateString ? moment(dateString).format(CONST.DATE_FORMAT_FOR_API) : undefined
        })
    }

    onFocusDatePicker = (name, date, dateString) => {
        let error = this.state.error;
        delete error[name];
        this.setState({
            error: error
        })
    }

    onBlurDatePicker = (name, date, dateString) => {
        let error = this.state.error;
        if (!dateString) {
            error[name] = 'error'
        }

        this.setState({
            error: error
        })
    }

    onChange = (name, value) => {
        this.setState({
            [name]: value
        })
    }

    onFocus = (name, value) => {
        let error = this.state.error;
        delete error[name];
        this.setState({
            error: error
        })
    }

    onBlur = (name, value) => {
        let error = this.state.error;
        if (value === '' || value === undefined) {
            error[name] = 'error'
        }
        this.setState({
            ...this.state,
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
        let state = this.state;
        let status = true;
        let error = this.state.error;
        if (state['date'].length <= 0) {
            error['date'] = 'error';
            status = false;
        }

        this.setState({
            error: error
        })

        return status
    }


}

export default WithLayoutAdmin(DateSaturdayFulls);