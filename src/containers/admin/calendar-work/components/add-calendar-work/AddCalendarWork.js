import React, { Component } from 'react';
import { Select, TimePicker, message } from 'antd';
import handleException from '../../../../../utils/handleException';
import Session from '../../../../../utils/Session';
import { getListGroupUsers } from '../../../../../modules/groupusers';
import moment from 'moment';
import * as CONST from '../../../../../config/constant';
import { createCalendarWork } from '../../../../../modules/calendarWork';

const Option = Select.Option;
const format = CONST.HHMM;

class AddCalendarWork extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataGroupUsers: [],
            error: {},
            repeat: false,
            isLoading: false,
            end: '17:00',
            start: '07:00',
        }
    }

    componentWillMount() {

    }

    componentDidMount() {
        this.getApiGroupUser();
    }

    renderGroupUser = () => {
        let children = [];
        let data = this.state.dataGroupUsers;
        for (let i = 0; i < data.length; i++) {
            children.push(<Option key={i} label={data[i].name} value={data[i].id}>{data[i].name}</Option>);
        }

        return children;
    }

    getApiGroupUser = () => {
        this.setState({
            isLoading: true
        })

        let access_token = Session.get().token.access_token;
        let data = {
            access_token: access_token
        }

        getListGroupUsers(data).then(res => {
            this.setState({
                dataGroupUsers: res.data.data,
                isLoading: false
            });
        }).catch(e => {
            handleException(e).next();
        })
    }

    render() {
        let error = this.state.error;
        return (
            <div className="row">
                <div className="col-12 grid-margin stretch-card">
                    <div className="card">
                        <div className="card-body">
                            <h4 className="card-title">Add calendar Work</h4>
                            <div className="template-demo">
                                <div className='form-group'>
                                    <p className="card-description">
                                        Day : <code>{CONST.DAY[this.props.day]}</code>
                                    </p>
                                </div>
                                <div className="form-group">
                                    <label >Group Users <span className='error-span'>*</span></label>
                                    <Select
                                        mode="multiple"
                                        size='large'
                                        placeholder="Group users"
                                        onChange={(value) => this.onChangeGroupUsers('groupUsers', value)}
                                        style={{ width: '100%' }}
                                        optionFilterProp="label"
                                        value={this.props.groupUsers}
                                        onFocus={(value) => this.onFocusGroupUsers('groupUsers', value)}
                                        onBlur={(value) => this.onBlurGroupUsers('groupUsers', value)}
                                    >
                                        {this.renderGroupUser()}
                                    </Select>
                                    {error && error['groupUsers'] ? <label className='error-label' >Sorry, please enter a valid group users ? <span className='error-span'>*</span></label> : ''}
                                </div>
                                <div className="form-group">
                                    <div className='row'>
                                        <div className='col-md-6 form-group'>
                                            <label style={{ width: '100%' }} >start<span className='error-span'>*</span></label>
                                            <TimePicker
                                                style={{ width: '100%' }}
                                                value={this.state.start ? moment(this.state.start, format) : undefined}
                                                format={format}
                                                size="large"
                                                onChange={(time, timeString) => this.onChangeStartEnd('start', timeString)}
                                            />

                                            {error && error['start'] ? <label className='error-label' >Sorry, please enter a valid start ? <span className='error-span'>*</span></label> : ''}
                                        </div>
                                        <div className='col-md-6 form-group'>
                                            <label style={{ width: '100%' }} >end<span className='error-span'>*</span></label>
                                            <TimePicker
                                                style={{ width: '100%' }}
                                                value={this.state.end ? moment(this.state.end, format) : undefined}
                                                format={format}
                                                size="large"
                                                onChange={(time, timeString) => this.onChangeStartEnd('end', timeString)}
                                            />
                                            {error && error['end'] ? <label className='error-label' >Sorry, please enter a valid end ? <span className='error-span'>*</span></label> : ''}
                                        </div>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <div className="form-check form-check-flat form-check-primary">
                                        <label className="form-check-label">
                                            <input
                                                type="checkbox"
                                                className="form-check-input"
                                                onClick={this.repeat}
                                                checked={this.state.repeat}
                                            />
                                            Repeat
                                            <i className="input-helper"></i>
                                        </label>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <button
                                        type="button"
                                        className="btn btn-gradient-danger"
                                        onClick={this.submit}
                                        disabled={this.state.isLoading}
                                    >
                                        Submit
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    submit = () => {
        if (!this.isValid()) return null;
        this.setState({
            isLoading: true
        })
        let data = [];
        let groupUsers = this.props.groupUsers;
        let date = this.props.date;

        if (!this.state.repeat) {
            data.push({
                day: this.props.day,
                date: this.props.date,
            })
        }
        else {
            let listDateFullYear = this.getDateFullYear();
            for (let i = 0; i < listDateFullYear.length; i++) {
                data.push({
                    day: this.props.day,
                    date: listDateFullYear[i],
                })
            }
        }

        let access_token = Session.get().token.access_token;
        let inputs = {
            data: data,
            group_users: groupUsers,
            access_token: access_token,
            date: date,
            start: this.state.start,
            end: this.state.end
        }
        createCalendarWork(inputs).then(res => {
            let data = res.data;
            if (data.status === 1) {
                this.error();
            } else {
                this.success();
                this.setState({
                    isLoading: false
                })
            }

        }).catch(e => {
            handleException(e).next();
        })

    }

    success = () => {
        message.success('Create calendar work success');
    };

    error = () => {
        message.error('Create calendar work error');
    };

    getDateFullYear = () => {
        let start = moment(this.props.year + '-01-01');
        let end = moment(this.props.year + '-12-31');
        let dayStart = moment(moment(start).format(CONST.DATE_FORMAT_FOR_API)).day();
        let dayEnd = moment(moment(end).format(CONST.DATE_FORMAT_FOR_API)).day();
        let day = 1;
        let result = [];
        let current = start.clone();
        if (dayStart === 1) {
            result.push(moment(start).format(CONST.DATE_FORMAT_FOR_API_STRING))
        }
        while (current.day(7 + day).isBefore(end)) {
            result.push(moment(current.clone()).format(CONST.DATE_FORMAT_FOR_API_STRING));
        }
        if (dayEnd === 1) {
            result.push(moment(end).format(CONST.DATE_FORMAT_FOR_API_STRING))
        }

        return result;
    }

    repeat = () => {
        this.setState({
            repeat: !this.state.repeat
        })
    }

    onChangeGroupUsers = (name, value) => {
        this.props.onChange(name, value);
    }

    onBlurGroupUsers = (name, value) => {
        let error = this.state.error;
        if (!value || value.length <= 0) {
            error[name] = 'error'
        }
        this.setState({
            error: error
        })
    }

    onFocusGroupUsers = (name, value) => {
        let error = this.state.error;
        delete error[name];
        this.setState({
            error: error
        })
    }

    onChangeStartEnd = (name, value) => {
        this.setState({
            [name]: value
        })
        this.props.onChange(name, value);
    }

    isValid = () => {
        let error = this.state.error;
        let status = true;
        if (this.props.groupUsers.length <= 0) {
            error['groupUsers'] = 'error';
            status = false;
        }

        if (!this.state.start) {
            error['start'] = 'error';
            status = false;
        }

        if (!this.state.end) {
            error['end'] = 'error';
            status = false;
        }

        this.setState({
            error: error
        })

        return status
    }

}



export default AddCalendarWork;