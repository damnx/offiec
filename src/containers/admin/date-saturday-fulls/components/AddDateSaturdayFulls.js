import React, { Component } from 'react';
import { Select, DatePicker } from 'antd';
import * as CONST from '../../../../config/constant';
import moment from 'moment';
import Session from '../../../../utils/Session';
import handleException from '../../../../utils/handleException';

const Option = Select.Option;


class AddDateSaturdayFulls extends Component {
    constructor(props) {
        super(props)

    }

    render() {
        let error = this.props.error;
        return (
            <div>
                
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
                            onChange={(value) => this.onChangeGroupUsers('groupUsersId', value)}
                            onBlur={(value) => this.onBlurGroupUsers('groupUsersId', value)}
                            onFocus={(value) => this.onFocusGroupUsers('groupUsersId', value)}
                            value={this.props.groupUsersId}
                            className={error && error['groupUsersId'] ? 'error-input' : ''}
                        >
                            {this.renderSelectGroupUsers()}
                        </Select>
                        {error && error['groupUsersId'] ? <label className='error-label' >Sorry, please enter a valid group users ? <span className='error-span'>*</span></label> : ''}
                    </div>

                    <div className="form-group">
                        <label>Date <span className='error-span'>*</span></label>
                        <DatePicker
                            className={error && error['date'] ? 'error-input date-picker-rules' : 'date-picker-rules'}
                            size='large'
                            format={CONST.DATE_FORMAT_FOR_DISPLAY}
                            onChange={(date, dateString) => this.onChangeDatePicker('date', date, dateString)}
                            value={this.props.valueDate ? moment(this.props.valueDate, CONST.DATE_FORMAT_FOR_API) : undefined}
                            onBlur={(date, dateString) => this.onBlurDatePicker('date', date, dateString)}
                            onFocus={(date, dateString) => this.onFocusDatePicker('date', date, dateString)}
                        />
                        {error && error['date'] ? <label className='error-label' >Sorry, please enter a valid Date ? <span className='error-span'>*</span></label> : ''}
                    </div>
                    <div className="form-group">
                        {this.renderTagRulesDate()}
                    </div>
                </div>            
        );
    }

    renderSelectGroupUsers = () => {
        let dataGroupUsers = this.props.dataGroupUsers;
        let children = [];
        for (let i = 0; i < dataGroupUsers.length; i++) {
            children.push(<Option key={i} label={dataGroupUsers[i].name + " - " + dataGroupUsers[i].user_count + " user"} value={dataGroupUsers[i].id}>{dataGroupUsers[i].name + " - " + dataGroupUsers[i].user_count + " user"}</Option>);
        }
        return children;
    }

    renderTagRulesDate = () => {
        let date = this.props.date;
        let result = [];
        for (let i = 0; i < date.length; i++) {
            result.push(<span key={i} className="badge badge-pill badge-primary">{moment(date[i], CONST.DATE_FORMAT_FOR_API).format(CONST.DATE_FORMAT_FOR_DISPLAY)} <i onClick={() => this.removeDate(date[i])} className="fa fa-times fa-times-red " aria-hidden="true"></i></span>)
        }

        return result;
    }

    onChangeGroupUsers = (name, value) => {
        this.props.onChange(name, value)
    }

    onBlurGroupUsers = (name, value) => {
        let error = this.props.error;
        if (value.length <= 0) error[name] = 'error';
        this.props.onBlur(name, error)
    }

    onFocusGroupUsers = (name, value) => {
        let error = this.props.error;
        delete error[name];
        this.props.onFocus(name, error)
    }

    onChangeDatePicker = (name, date, dateString) => {
        let dateNews = this.props.date;
        if (!dateNews.includes(moment(date).format(CONST.DATE_FORMAT_FOR_API)) && date) {
            dateNews.push(moment(date).format(CONST.DATE_FORMAT_FOR_API));
        }

        this.props.onChangeDatePicker(name, dateNews, dateString ? moment(dateString).format(CONST.DATE_FORMAT_FOR_API) : undefined)

    }

    onFocusDatePicker = (name, date, dateString) => {
        let error = this.props.error;
        delete error[name];
        this.props.onFocus(name, error);
    }

    onBlurDatePicker = (name, date, dateString) => {
        let error = this.props.error;
        if (!dateString) {
            error[name] = 'error';
        }
        this.props.onFocus(name, error);
    }

    removeDate = (date) => {
        let dateNews = this.props.date;
        let error = this.props.error;
        let index = dateNews.indexOf(date);
        if (index !== -1) dateNews.splice(index, 1);
        if (dateNews.length <= 0) {
            error.date = 'error';
        }
        this.props.onChangeDatePicker('date', dateNews, undefined, error)
    }

}

export default AddDateSaturdayFulls;