import React, { Component } from 'react';
import { Calendar, Badge } from 'antd';
import WithLayoutAdmin from '../../../components/Admin/WithLayout/WithLayoutAdmin';
import moment from 'moment';
import * as CONST from '../../../config/constant';
import { Modal, Select, TimePicker } from 'antd';
import Session from '../../../utils/Session';
import { getListGroupUsers } from '../../../modules/groupusers';
import handleException from '../../../utils/handleException';

const Option = Select.Option;
const format = CONST.HHMM;

class CalendarWork extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [
                {
                    'id': 1,
                    'date': '2018-08-07',
                    'group_users': [{
                        "id": 15,
                        "name": 'test',
                    }]
                },
                {
                    'id': 2,
                    'date': '2018-08-01',
                    'group_users': [{
                        "id": 15,
                        "name": 'test2',
                    }]
                }
            ],
            visible: false,
            value: undefined,
            error: {},
            repeat_year: false,
            day: moment(moment().format(CONST.DATE_FORMAT_FOR_API)).day(),
            year: moment(moment().format(CONST.DATE_FORMAT_FOR_API)).year(),
            month: moment(moment().format(CONST.DATE_FORMAT_FOR_API)).month(),
            isLoading: true,
            dataGroupUsers: [],
            group_users: [],
            ends: '17:00',
            starts: '07:00'

        }
    }

    componentWillMount() {
        let start = moment('2018-08-01');
        let end = moment('2018-08-20');
        let day = 1;
        let result = [];
        let current = start.clone();
        while (current.day(7 + day).isBefore(end)) {
            result.push(current.clone());
        }

        console.log(result);
    }

    componentDidMount() {
        this.getApiGroupUser();
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
                                                >
                                                    {this.renderGroupUser()}
                                                </Select>
                                                {error && error['groupUsersId'] ? <label className='error-label' >Sorry, please enter a valid group users ? <span className='error-span'>*</span></label> : ''}
                                            </div>
                                            <div className="form-group">
                                                <div className='row'>
                                                    <div className='col-md-6 form-group'>
                                                        <label style={{ width: '100%' }} >Starts<span className='error-span'>*</span></label>
                                                        <TimePicker
                                                            style={{ width: '100%' }}
                                                            value={moment(this.state.starts, format)}
                                                            format={format}
                                                            size="large"
                                                            onChange={(time, timeString) => this.onChangeStartsEnds('starts', timeString)}
                                                        />

                                                        {error && error['groupUsersId'] ? <label className='error-label' >Sorry, please enter a valid group users ? <span className='error-span'>*</span></label> : ''}
                                                    </div>
                                                    <div className='col-md-6 form-group'>
                                                        <label style={{ width: '100%' }} >Ends<span className='error-span'>*</span></label>
                                                        <TimePicker
                                                            style={{ width: '100%' }}
                                                            format={format}
                                                            size="large"
                                                            onChange={(time, timeString) => this.onChangeStartsEnds('ends', time, timeString)}
                                                            value={moment(this.state.ends, format)}
                                                        />
                                                        {error && error['groupUsersId'] ? <label className='error-label' >Sorry, please enter a valid group users ? <span className='error-span'>*</span></label> : ''}
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

    onChangeStartsEnds = (name, timeString) => {
        this.setState({
            [name]: timeString
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

    handleOk = () => {
        this.setState({
            visible: false
        })
    }

    handleCancel = () => {
        this.setState({
            visible: false
        })
    }

    onChangeCalendar = (name, value) => {
        let day = moment(moment(value).format(CONST.DATE_FORMAT_FOR_API)).day();
        this.setState({
            visible: true,
            day: day
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
        this.setState({
            visible: true,
            day: day
        })
    }

    getListData = (value) => {
        let listData;
        let data = this.state.data;
        for (let i = 0; i < data.length; i++) {
            if (data[i].date === moment(value).format(CONST.DATE_FORMAT_FOR_API)) {
                listData = [
                    { type: 'warning', content: 'This is warning event.' },
                ]; continue;
            }
        }


        return listData || [];
    }

    dateCellRender = (value) => {
        const listData = this.getListData(value);
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
            children.push(<Option key={i} label={data[i].name}>{data[i].name}</Option>);
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
}

export default WithLayoutAdmin(CalendarWork);