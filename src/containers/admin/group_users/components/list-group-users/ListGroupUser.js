import React, { Component } from 'react';
import * as CONST from '../../../../../config/constant';
import { Pagination } from 'antd';
import DeleteGroupUsere from '../delete-group-users/DeleteGroupUsere';
import UpdateGroupUsers from '../update-group-users/UpdateGroupUsers';

class ListGroupUser extends Component {
    constructor(props) {
        super(props);

    }

    render() {
        return (
            <div>
                <div className='form-group' style={{ overflow: 'auto' }}>
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
                        pageSize={this.props.pageSize}
                        total={this.props.total}
                        current={this.props.page}
                        showQuickJumper
                        defaultPageSize={this.props.page}
                        onChange={this.onChange}
                    />}
                </div>
            </div>
        );
    }

    rendernotFound = () => {

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
                    <UpdateGroupUsers
                        data={data[i]}
                        onClick={this.onClickUpdate}
                    />
                    <DeleteGroupUsere
                        id={data[i].id}
                        cellApiGetListGroupUsers={this.cellApiGetListGroupUsers}
                        page={this.props.page}
                        isLoading={this.props.isLoading}
                    />

                </td>
            </tr >)
        }
        return result;
    }

    cellApiGetListGroupUsers = (page) => {
        this.props.cellApiGetListGroupUsers(page)
    }

    onClickUpdate = (data) => {
        this.props.onClickUpdate(data);
    }

    onChange = (page, pageSize) => {
        this.props.onChangePaginate(page, pageSize)
    }
}

export default ListGroupUser;