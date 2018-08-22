import React, { Component } from 'react';
import WithLayoutAdmin from '../../../components/Admin/WithLayout/WithLayoutAdmin';
import moment from 'moment';
import * as CONST from '../../../config/constant';
import ListCalendar from './components/list-calendar/ListCalendar';
import AddCalendar from './components/add-calendar/AddCalendar';

class Calendar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            date: moment(),
            visible: false
        }
    }
    render() {
        return (
            <div className='content-wrapper'>
                <div className="page-header">
                    <h3 className="page-title"><span className="page-title-icon bg-gradient-primary text-white mr-2"><i className="mdi mdi-account-multiple-plus" aria-hidden="true"></i></span>Group Users</h3>
                    <nav id="Edit-Group-User" aria-label="breadcrumb"><ul className="breadcrumb"><li className="breadcrumb-item active" aria-current="page"><span></span>Overview<i className="mdi mdi-alert-circle-outline icon-sm text-primary align-middle"></i></li></ul></nav>
                </div>
                <ListCalendar
                    date={this.state.date}
                    onSelectCalendar={this.onSelectCalendar}
                    onPanelChangeCalendar={this.onPanelChangeCalendar}
                />
                <AddCalendar
                    visible={this.state.visible}
                />
            </div>
        );
    }

    onSelectCalendar = (date) => {
        this.setState({
            date: date,
            visible: true
        })
    }

    onPanelChangeCalendar = (date) => {
        this.setState({
            date: date
        })
    }
}

export default WithLayoutAdmin(Calendar);