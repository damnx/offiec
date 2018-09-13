import React, { Component } from 'react';
import { Select, Input } from 'antd';
import './SearchGroupUsers.css';
import history from '../../../../../utils/history';
import * as CONST from '../../../../../config/constant';
import { encodeData } from '../../../../../utils/index';


const Option = Select.Option;
const Search = Input.Search;

class SearchGroupUsers extends Component {
    constructor(props) {
        super(props);

    }

    render() {
        return (
            <div className='row' style={{ padding: '10px 0px' }}>
                <div className='col-lg-8'>
                    <div className='row'>
                        <div className='col-md-6'>
                            <div className="form-group">
                                <Search
                                    placeholder="Name group"
                                    style={{ width: '100%' }}
                                    size="large"
                                    onChange={(e) => this.onChange('name', e.target.value)}
                                    value={this.props.search['name']}
                                />
                            </div>
                        </div>

                        <div className='col-md-6'>
                            <div className="form-group">
                                <Select
                                    showSearch
                                    style={{ width: '100%' }}
                                    placeholder="Select a status"
                                    optionFilterProp="children"
                                    filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                    size="large"
                                    allowClear
                                    onChange={(value) => this.onChange('status', value)}
                                >
                                    <Option value="public">public</Option>
                                    <Option value="pending">Pending</Option>
                                </Select>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='col-lg-4 text-right'>
                    <div className='row'>
                        <div className='col-lg-12'>
                            <div className="form-group">
                                <button
                                    type="button"
                                    className="btn btn-gradient-success btn-gradient-success-search-groupUsers btn-fw"
                                    onClick={this.onClick}
                                >
                                    Search
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    onChange = (name, value) => {
        let search = this.props.search;
        search[name] = value;
        this.props.onChangeSearchGroupUsers('search', search);

    }

    onClick = () => {
        let inputs = {
            page: this.props.page,
            pageSize: this.props.pageSize,
            name: this.props.search['name'],
            status: this.props.search['status']
        };

        history.push({
            pathname: '/group-users.html',
            search: encodeData(inputs)
        })

        this.props.cellApiGetListGroupUsers(this.props.page);
    }
}

export default SearchGroupUsers;