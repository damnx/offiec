import React, { Component } from 'react';
import { Calendar, Badge } from 'antd';
import WithLayoutAdmin from '../../../components/Admin/WithLayout/WithLayoutAdmin';
import moment from 'moment';
import * as CONST from '../../../config/constant';
import { Modal, Select, TimePicker, message, Spin } from 'antd';
import Session from '../../../utils/Session';
import { getListGroupUsers } from '../../../modules/groupusers';
import handleException from '../../../utils/handleException';
import { createCalendarWork, getCalendarWork } from '../../../modules/calendarWork';

const Option = Select.Option;
const format = CONST.HHMM;

class CalendarWork extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            visible: false,
            value: undefined,
            error: {},
            repeat_year: false,
            day: moment(moment().format(CONST.DATE_FORMAT_FOR_API)).day(),
            year: moment(moment().format(CONST.DATE_FORMAT_FOR_API)).year(),
            month: moment(moment().format(CONST.DATE_FORMAT_FOR_API)).month(),
            date: moment().format(CONST.DATE_FORMAT_FOR_API_STRING),
            isLoading: false,
            dataGroupUsers: [],
            group_users: [],
            end: '17:00',
            start: '07:00',
            error: {}
        }
    }

    componentWillMount() {

    }

    componentDidMount() {
        this.getApiGroupUser();
        this.getPaiListCalendarWork(this.state.year.toString() + ((this.state.month + 1).toString().length < 2 ? '0' + (this.state.month + 1).toString() : (this.state.month + 1).toString()));
    }

    render() {
        let error = this.state.error;
        return (
                <div className='content-wrapper'>
                    <div className='row'>
                        <div className='col-lg-12 grid-margin stretch-card'>
                            <div className='card'>
                                <div className='card-body'>
                                    <h4 className="card-title">Striped Table</h4>
                                    <p className="card-description">
                                        Add class <code>.table-striped</code>
                                    </p>
                                    <div className='forms-sample'>
                                        <Calendar
                                            dateCellRender={this.dateCellRender}
                                            monthCellRender={this.monthCellRender}
                                            onPanelChange={this.onPanelChange}
                                            onSelect={this.onSelect}
                                            onChange={(date) => this.onChangeCalendar('calendar', date)}
                                        />
                                    </div>
                                    <div>
                                        <Modal
                                            title="Basic Modal"
                                            visible={this.state.visible}
                                            onOk={this.handleOk}
                                            onCancel={this.handleCancel}
                                        >
                                            <div className='forms-sample'>
                                                <div className='form-group'>
                                                    <p className="card-description">
                                                        Day : <code>{CONST.DAY[this.state.day]}</code>
                                                    </p>
                                                </div>
                                                <div className="form-group">
                                                    <label >Group Users <span className='error-span'>*</span></label>
                                                    <Select
                                                        mode="multiple"
                                                        size='large'
                                                        placeholder="Group users"
                                                        // defaultValue={['a10', 'c12']}
                                                        onChange={(value) => this.onChangeGroupUsers('group_users', value)}
                                                        style={{ width: '100%' }}
                                                        optionFilterProp="label"
                                                        value={this.state.group_users}
                                                        onFocus={(value) => this.onFocus('group_users', value)}
                                                        onBlur={(value) => this.onBlur('group_users', value)}
                                                    >
                                                        {this.renderGroupUser()}
                                                    </Select>
                                                    {error && error['group_users'] ? <label className='error-label' >Sorry, please enter a valid group users ? <span className='error-span'>*</span></label> : ''}
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
                                                    <div className="form-check">
                                                        <label className="form-check-label">
                                                            <input
                                                                type="radio"
                                                                className="form-check-input"
                                                                name="membershipRadios"
                                                                id="membershipRadios1"
                                                                value="repeat_year"
                                                                onClick={(e) => this.handleOptionChange('repeat_year', e.target.value)}
                                                                checked={this.state.repeat_year}
                                                            />
                                                            Repeat year
                                                        <i className="input-helper"></i>
                                                        </label>
                                                    </div>
                                                </div>
                                            </div>
                                        </Modal>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div >
            
        );
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
        switch (name) {
            case 'group_users':
                if (value.length <= 0 || !value) {
                    error[name] = 'error'
                }
                break;
            case 'start':
            case 'end':
                if (!value) {
                    error[name] = 'error'
                }
                break;
            default:
                break;
        }

        this.setState({
            error: error
        })
    }

    onChangeStartEnd = (name, timeString) => {
        let error = this.state.error;
        if (!timeString) {
            error[name] = 'error'
        }
        else {
            delete error[name];
        }

        this.setState({
            [name]: timeString,
            error: error
        })
    }

    onChangeGroupUsers = (name, value) => {
        this.setState({
            [name]: value
        })
    }

    handleOptionChange = (name, value) => {
        this.setState({
            [name]: !this.state.repeat_year
        })
    }

    getDateFullYear = () => {
        let start = moment(this.state.year + '-01-01');
        let end = moment(this.state.year + '-12-31');
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

    handleOk = () => {
        if (!this.isValid()) return;
        let data = [];
        let group_users = this.state.group_users;

        if (!this.state.repeat_year) {
            data.push({
                day: this.state.day,
                date: this.state.date,
                start: this.state.start,
                end: this.state.end
            })
        }
        else {
            let listDateFullYear = this.getDateFullYear();
            for (let i = 0; i < listDateFullYear.length; i++) {
                data.push({
                    day: this.state.day,
                    date: listDateFullYear[i],
                    start: this.state.start,
                    end: this.state.end
                })
            }
        }

        let access_token = Session.get().token.access_token;
        let inputs = {
            data: data,
            group_users: group_users,
            access_token: access_token
        }
        createCalendarWork(inputs).then(res => {
            let data = res.data;
            if (data.state === 1) {
                this.error();
            } else {
                this.success();
                this.setState({
                    visible: false
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

    handleCancel = () => {
        this.setState({
            visible: false
        })
    }

    onChangeCalendar = (name, value) => {
        let day = moment(moment(value).format(CONST.DATE_FORMAT_FOR_API)).day();
        let year = moment(moment(value).format(CONST.DATE_FORMAT_FOR_API)).year();
        let month = moment(moment(value).format(CONST.DATE_FORMAT_FOR_API)).month();
        this.getPaiListCalendarWork(year.toString() + ((month + 1).toString().length < 2 ? '0' + (month + 1).toString() : (month + 1).toString()));
        this.setState({
            visible: true,
            day: day,
            date: moment(value).format(CONST.DATE_FORMAT_FOR_API_STRING),
            year: year,
            month: month
        })
    }

    onPanelChange = (date, mode) => {
        this.setState({
            month: moment(moment(date).format(CONST.DATE_FORMAT_FOR_API)).month(),
            year: moment(moment(date).format(CONST.DATE_FORMAT_FOR_API)).year(),
        })
    }

    onSelect = (date) => {
        let day = moment(moment(date).format(CONST.DATE_FORMAT_FOR_API)).day();
        let year = moment(moment(date).format(CONST.DATE_FORMAT_FOR_API)).year();
        let month = moment(moment(date).format(CONST.DATE_FORMAT_FOR_API)).month();
        this.getPaiListCalendarWork(year.toString() + ((month + 1).toString().length < 2 ? '0' + (month + 1).toString() : (month + 1).toString()));
        this.setState({
            visible: true,
            day: day,
            date: moment(date).format(CONST.DATE_FORMAT_FOR_API_STRING)
        })
    }

    getListDate = (value) => {
        let listData;
        let data = this.state.data;
        for (let i = 0; i < data.length; i++) {
            if (data[i].date === moment(value).format(CONST.DATE_FORMAT_FOR_API_STRING)) {
                let group_user = data[i].group_user
                listData = [];
                for (let i = 0; i < group_user.length; i++) {
                    listData.push({ type: 'warning', content: group_user[i].name });
                }
            }
        }
        return listData || [];
    }

    dateCellRender = (value) => {
        const listData = this.getListDate(value);
        return (
            <ul className="events">
                {
                    listData.map(item => (
                        <li key={item.content}>
                            <Badge status={item.type} text={item.content} />
                        </li>
                    ))
                }
            </ul>
        );
    }

    getMonthData = (value) => {
        if (value.month() === 8) {
            return 1394;
        }
    }

    monthCellRender = (value) => {
        const num = this.getMonthData(value);
        return num ? (
            <div className="notes-month">
                <section>{num}</section>
                <span>Backlog number</span>
            </div>
        ) : null;
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
            handleException(e).next();
        })
    }

    getPaiListCalendarWork = (date) => {
        let access_token = Session.get().token.access_token;
        let data = {
            access_token: access_token,
            date: date
        }
        this.setState({
            isLoading: true,
        }, () => {
            getCalendarWork(data).then(res => {
                if (res.data.status === 0) {
                    this.setState({
                        data: res.data.data,
                        isLoading: false
                    })
                }
            }).catch(e => {
                handleException(e).next();
            })
        })

    }

    isValid = () => {
        let error = this.state.error;
        let status = true;
        if (this.state.group_users.length <= 0) {
            error['group_users'] = 'error';
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

export default WithLayoutAdmin(CalendarWork);