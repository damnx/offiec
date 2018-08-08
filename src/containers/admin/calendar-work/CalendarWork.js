import React, { Component } from 'react';
import { Calendar, Badge } from 'antd';
import WithLayoutAdmin from '../../../components/Admin/WithLayout/WithLayoutAdmin';
import moment from 'moment';
import * as CONST from '../../../config/constant';
import { Modal, Select, TimePicker } from 'antd';

const Option = Select.Option;
const format = 'HH:mm';

const children = [];
for (let i = 10; i < 36; i++) {
    children.push(<Option key={i.toString(36) + i}>{i.toString(36) + i}</Option>);
}

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
            error: {}
        }
    }

    componentWillMount() {

    }

    componentDidMount() {

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
                                        onChange={(date) => this.onChange('calendar', date)}
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
                                                    Day : <code>Monday</code>
                                                </p>
                                            </div>
                                            <div className="form-group">
                                                <label >Group Users <span className='error-span'>*</span></label>
                                                <Select
                                                    mode="tags"
                                                    size='large'
                                                    placeholder="Group users"
                                                    defaultValue={['a10', 'c12']}
                                                    onChange={(value) => this.onChange('group_id', value)}
                                                    style={{ width: '100%' }}
                                                >
                                                    {children}
                                                </Select>
                                                {error && error['groupUsersId'] ? <label className='error-label' >Sorry, please enter a valid group users ? <span className='error-span'>*</span></label> : ''}
                                            </div>
                                            <div className="form-group">
                                                <div className='row'>
                                                    <div className='col-md-6 form-group'>
                                                        <label style={{ width: '100%' }} >Starts<span className='error-span'>*</span></label>
                                                        <TimePicker style={{ width: '100%' }} defaultValue={moment('12:08', format)} format={format} size="large" />
                                                        {error && error['groupUsersId'] ? <label className='error-label' >Sorry, please enter a valid group users ? <span className='error-span'>*</span></label> : ''}
                                                    </div>
                                                    <div className='col-md-6 form-group'>
                                                        <label style={{ width: '100%' }} >Ends<span className='error-span'>*</span></label>
                                                        <TimePicker style={{ width: '100%' }} defaultValue={moment('12:08', format)} format={format} size="large" />
                                                        {error && error['groupUsersId'] ? <label className='error-label' >Sorry, please enter a valid group users ? <span className='error-span'>*</span></label> : ''}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="form-group">
                                                <div className="form-check">
                                                    <label className="form-check-label">
                                                        <input type="radio" className="form-check-input" name="membershipRadios" id="membershipRadios1" value="" />Repeat month<i className="input-helper"></i>
                                                    </label>
                                                </div>
                                                <div className="form-check">
                                                    <label className="form-check-label">
                                                        <input type="radio" className="form-check-input" name="membershipRadios" id="membershipRadios1" value="" />Repeat year<i className="input-helper"></i>
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

    onChange = (name, value) => {
        switch (name) {
            case 'calendar':
                console.log(moment(value).format(CONST.DATE_FORMAT_FOR_API));
                break
        }
        this.setState({
            visible: true
        })
    }

    onPanelChange = (date, mode) => {
        console.log(date, mode)
    }

    onSelect = (date) => {
        this.setState({
            visible: true
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
}

export default WithLayoutAdmin(CalendarWork);