import React, { Component } from 'react';
import * as CONST from '../../../../../config/constant';
import { Pagination } from 'antd';
import { destroyGroupUsers } from '../../../../../modules/groupusers';
import Session from '../../../../../utils/Session';
import handleException from '../../../../../utils/handleException';
import { message } from 'antd';

class ListGroupUser extends Component {



    render() {
        return (
            <div>
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
                    {this.props.total > CONST.PAGE_SIZE && <Pagination
                        size="small"
                        pageSize={CONST.PAGE_SIZE}
                        // onChange={this.onChangePaginate}
                        total={this.props.total}
                        current={this.props.currentPage}
                        showQuickJumper
                        defaultPageSize={this.props.page}
                    />}
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
                    <button
                        href="#Edit-Group-User"
                        className="btn btn-gradient-primary btn-icon-text btn-sm mr-2"

                        type="submit"
                    >
                        Edit
                          <i className="mdi mdi-file-check btn-icon-append"></i>
                    </button>

                    <button
                        className="btn btn-gradient-danger btn-lg btn-sm"

                        type="submit"
                        disabled={this.props.isLoading ? this.props.isLoading : false}
                    >
                        Delete
                        <i className="mdi mdi-delete-forever"></i>
                    </button>
                </td>
            </tr >)
        }
        return result;
    }

}

export default ListGroupUser;