import React, { Component } from 'react';
import { Calendar, Badge } from 'antd';
import WithLayoutAdmin from '../../../components/Admin/WithLayout/WithLayoutAdmin';
import moment from 'moment';
import * as CONST from '../../../config/constant';
import { Modal, TreeSelect } from 'antd';

const SHOW_PARENT = TreeSelect.SHOW_PARENT;
const treeData = [{
    title: 'Node1',
    value: '0-0',
    key: '0-0',
    children: [{
        title: 'Child Node1',
        value: '0-0-0',
        key: '0-0-0',
    }],
}, {
    title: 'Node2',
    value: '0-1',
    key: '0-1',
    children: [{
        title: 'Child Node3',
        value: '0-1-0',
        key: '0-1-0',
    }, {
        title: 'Child Node4',
        value: '0-1-1',
        key: '0-1-1',
    }, {
        title: 'Child Node5',
        value: '0-1-2',
        key: '0-1-2',
    }],
}];

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
        }
    }

    componentWillMount() {

    }

    componentDidMount() {

    }

    render() {
        const tProps = {
            treeData,
            value: this.state.value,
            onChange: this.onChange,
            treeCheckable: true,
            showCheckedStrategy: SHOW_PARENT,
            searchPlaceholder: 'Please select',
            style: {
                width: 300,
            },
        };
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
                                        onChange={this.onChange}
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
                                            <div className="form-group">
                                                <TreeSelect {...tProps} />
                                            </div>
                                        </div>
                                    </Modal>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
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

    onChange = (date) => {
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