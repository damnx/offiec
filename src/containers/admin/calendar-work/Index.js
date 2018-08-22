import React, { Component } from 'react';
import WithLayoutAdmin from '../../../components/Admin/WithLayout/WithLayoutAdmin';
import AddCalendarWork from './components/add-calendar-work/AddCalendarWork';
import ListCalendar from './components/list/ListCalendar';
import moment from 'moment';
import * as CONST from '../../../config/constant';

class Index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            groupUsers: [],
            day: moment(moment().format(CONST.DATE_FORMAT_FOR_API)).day(),
            year: moment(moment().format(CONST.DATE_FORMAT_FOR_API)).year(),
            month: moment(moment().format(CONST.DATE_FORMAT_FOR_API)).month(),
            date: moment().format(CONST.DATE_FORMAT_FOR_API_STRING),
        }

    }

    componentWillMount() {

    }

    componentDidMount() {

    }


    render() {
        return (
            <div className='content-wrapper'>
                <AddCalendarWork
                    groupUsers={this.state.groupUsers}
                    onChange={this.onChangeAddCalendarWork}
                    day={this.state.day}
                    year={this.state.year}
                    month={this.state.month}
                    date={this.state.date}
                />
                <ListCalendar
                    day={this.state.day}
                    year={this.state.year}
                    month={this.state.month}
                    date={this.state.date}
                    onChangeCalendar={this.onChangeCalendar}
                   
                />
            </div>
        );
    }

    onChangeCalendar = (day, date, year, month) => {
        this.setState({
            day: day,
            date: date,
            year: year,
            month: month
        })
    }

    onChangeAddCalendarWork = (name, value) => {
        this.setState({
            [name]: value
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

export default WithLayoutAdmin(Index);