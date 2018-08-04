import React, { Component } from 'react';
import * as CONST from '../../../../../config/constant';
import { Pagination } from 'antd';

class ListGroupUser extends Component {
    constructor(props) {
        super(props)

    }

    render() {
        return (
            <div className='col-12 grid-margin'>
                <div className='card'>
                    <div className="card-body">
                        <h4 className="card-title">List Group Users</h4>
                        <div className='form-group'>
                            <table className="table table-hover">
                                <thead>
                                    <tr>
                                        <th>Name Group</th>
                                        <th>Number of Member</th>
                                        <th>Status</th>
                                        <th className='text-right'>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.renderGroupUser()}
                                </tbody>
                            </table>
                        </div>
                        <div className='form-group text-right'>
                            <Pagination
                                size="small"
                                pageSize={CONST.PAGE_SIZE}
                                onChange={this.onChangePaginate}
                                total={this.props.total}
                                current={this.props.current_page}
                                showQuickJumper
                            />

                        </div>
                    </div>
                </div>
            </div>
        );
    }

    renderGroupUser = () => {
        let data = this.props.dataGroupUsers;
        let result = []
        for (let i in data) {
            result.push(<tr key={i}>
                <td>{data[i].name}</td>
                <td className="text-danger"> {data[i].user_count} <i className="mdi mdi-account-check"></i></td>
                <td><label className={CONST.ENUM_GROUP_USERS_STATUS[data[i].status].className + ' badge'}>{CONST.ENUM_GROUP_USERS_STATUS[data[i].status].value}</label></td>
                <td className='text-right'>
                    <a
                        href="#Edit-Group-User"
                        className="btn btn-gradient-primary btn-icon-text btn-sm mr-2"
                        onClick={() => this.onClickUpdate(i)}
                    >
                        Edit
                          <i className="mdi mdi-file-check btn-icon-append"></i>
                    </a>

                    <a
                        className="btn btn-gradient-danger btn-lg btn-sm"
                        onClick={this.onClickDelete}
                    >
                        Delete
                        <i className="mdi mdi-delete-forever"></i>
                    </a>
                </td>
            </tr >)
        }
        return result;
    }

    onChangePaginate = (page, pageSize) => {
        this.props.onChange(page, pageSize)
    }

    onClickUpdate = (isKey) => {
        this.props.onClickUpdate(isKey)
    }
}

export default ListGroupUser;