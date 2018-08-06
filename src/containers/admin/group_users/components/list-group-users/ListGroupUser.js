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
                            {this.props.total > CONST.PAGE_SIZE && <Pagination
                                size="small"
                                pageSize={CONST.PAGE_SIZE}
                                onChange={this.onChangePaginate}
                                total={this.props.total}
                                current={this.props.current_page}
                                showQuickJumper
                                defaultPageSize={this.props.page}
                            />}
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
                    <button
                        href="#Edit-Group-User"
                        className="btn btn-gradient-primary btn-icon-text btn-sm mr-2"
                        onClick={() => this.onClickUpdate(i)}
                        type="submit"
                    >
                        Edit
                          <i className="mdi mdi-file-check btn-icon-append"></i>
                    </button>

                    <button
                        className="btn btn-gradient-danger btn-lg btn-sm"
                        onClick={() => this.onClickDelete(i)}
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

    onClickDelete = (isKey) => {
        this.apiDestroyGroupUsers(isKey);
    }

    apiDestroyGroupUsers = (isKey) => {
        let data = this.props.dataGroupUsers;
        let id = data[isKey].id;
        let access_token = Session.get().token.access_token;
        let dataNew = {
            access_token: access_token,
            id: id,
        }
        destroyGroupUsers(dataNew).then(res => {
            if (res.data.status === 0) {
                this.success();
                this.props.onClickDelete(isKey);
            } else {
                this.error();
                this.props.onClickDelete(null);
            }
        }).catch(e => {
            handleException(e).next();
        })
    }

    success = () => {
        message.success('Delete Group User Success');
    };

    error = () => {
        message.error('Delete Group User Error');
    };


    onChangePaginate = (page, pageSize) => {
        this.props.onChange(page, pageSize)
    }

    onClickUpdate = (isKey) => {
        this.props.onClickUpdate(isKey)
    }
}

export default ListGroupUser;