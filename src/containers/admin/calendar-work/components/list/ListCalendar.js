import React, { Component } from 'react';
import { Calendar, Badge } from 'antd';
import moment from 'moment';
import * as CONST from '../../../../../config/constant';
import Session from '../../../../../utils/Session';
import { getCalendarWork } from '../../../../../modules/calendarWork';
import handleException from '../../../../../utils/handleException';

class ListCalendar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            isLoading: false
        }
    }

    componentWillMount() {

    }

    componentDidMount() {
        this.getPaiListCalendarWork(this.props.year.toString() + ((this.props.month + 1).toString().length < 2 ? '0' + (this.props.month + 1).toString() : (this.props.month + 1).toString()));
    }

    render() {
        return (
            <div className="row">
                <div className="col-12 grid-margin stretch-card">
                    <div className="card">
                        <div className="card-body">
                            <h4 className="card-title">calendar Work</h4>
                            <div className="forms-sample">
                                <Calendar
                                    dateCellRender={this.dateCellRender}
                                    monthCellRender={this.monthCellRender}
                                    onPanelChange={this.onPanelChange}
                                    onSelect={this.onSelect}
                                    onChange={(date) => this.onChangeCalendar('calendar', date)}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    onChangeCalendar = (name, value) => {
        let day = moment(moment(value).format(CONST.DATE_FORMAT_FOR_API)).day();
        let year = moment(moment(value).format(CONST.DATE_FORMAT_FOR_API)).year();
        let month = moment(moment(value).format(CONST.DATE_FORMAT_FOR_API)).month();
        this.getPaiListCalendarWork(year.toString() + ((month + 1).toString().length < 2 ? '0' + (month + 1).toString() : (month + 1).toString()));
        this.props.onChangeCalendar(day, moment(value).format(CONST.DATE_FORMAT_FOR_API_STRING), year, month)
    }

    onPanelChange = (date, mode) => {
        let day = moment(moment(date).format(CONST.DATE_FORMAT_FOR_API)).day();
        let month = moment(moment(date).format(CONST.DATE_FORMAT_FOR_API)).month();
        let year = moment(moment(date).format(CONST.DATE_FORMAT_FOR_API)).year();
        this.getPaiListCalendarWork(year.toString() + ((month + 1).toString().length < 2 ? '0' + (month + 1).toString() : (month + 1).toString()));
        this.props.onChangeCalendar(day, moment(date).format(CONST.DATE_FORMAT_FOR_API_STRING), year, month)
    }

    onSelect = (date) => {
        let day = moment(moment(date).format(CONST.DATE_FORMAT_FOR_API)).day();
        let year = moment(moment(date).format(CONST.DATE_FORMAT_FOR_API)).year();
        let month = moment(moment(date).format(CONST.DATE_FORMAT_FOR_API)).month();
        this.getPaiListCalendarWork(year.toString() + ((month + 1).toString().length < 2 ? '0' + (month + 1).toString() : (month + 1).toString()));
        this.props.onChangeCalendar(day, moment(date).format(CONST.DATE_FORMAT_FOR_API_STRING), year, month)
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
                    console.log(res.data.data);
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

export default ListCalendar;