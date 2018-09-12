import React, { Component } from 'react';
import { Select, Input } from 'antd';
import './SearchGroupUsers.css'

const Option = Select.Option;
const Search = Input.Search;

class SearchGroupUsers extends Component {
    constructor(props) {
        super(props);

    }

    handleChange = (value) => {

    }

    handleBlur = () => {

    }

    handleFocus = () => {

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
                                    onSearch={value => console.log(value)}
                                    style={{ width: '100%' }}
                                    size="large"
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
                                    onChange={this.handleChange}
                                    onFocus={this.handleFocus}
                                    onBlur={this.handleBlur}
                                    filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                    size="large"
                                    allowClear
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
                                <button type="button" className="btn btn-gradient-success btn-gradient-success-search-groupUsers btn-fw">
                                    Search
                                    </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default SearchGroupUsers;