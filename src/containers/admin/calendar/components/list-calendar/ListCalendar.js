import React, { Component } from 'react';
import { Calendar, Alert } from 'antd';
import moment from 'moment';

class ListCalendar extends Component {
    constructor(props) {
        super(props);
       
    }

    componentWillMount() {

    }

    componentDidMount() {

    }

    render() {
        return (
            <div className='row'>
                <div className='col-12 grid-margin'>
                    <div className='card'>
                        <div className='card-body'>
                            <Calendar value={this.props.date} onSelect={this.onSelect} onPanelChange={this.onPanelChange} />
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    onSelect = (value) => {
        this.props.onSelectCalendar(value)
    }

    onPanelChange = (value) => {
        this.props.onPanelChangeCalendar(value)
    }
}


export default ListCalendar;