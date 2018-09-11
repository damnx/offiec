import React, { Component } from 'react';
import { destroyGroupUsers } from '../../../../../modules/groupusers';
import Session from '../../../../../utils/Session';
import handleException from '../../../../../utils/handleException';
import { message, Modal } from 'antd';

class DeleteGroupUsere extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isDisabled: false,
            visible: false
        }
    }

    confirm = () => {
        Modal.confirm({
            title: 'Are you sure delete this task?',
            content: '',
            okText: 'OK',
            cancelText: 'Cancel',
            onOk: this.onOk,
            confirmLoading: true
        });
    }

    onOk = () => {
        this.setState({
            visible: false,
        }, () => {
            this.onClick();
        });
    }

    render() {
        return (
            <button
                className="btn btn-gradient-danger btn-lg btn-sm"
                type="submit"
                disabled={this.state.isDisabled}
                onClick={this.confirm}
            >
                Delete
                        <i className="mdi mdi-delete-forever"></i>
            </button>
        );
    }

    onClick = () => {
        this.setState({
            isDisabled: true
        }, () => {
            this.cellApiDelete();
        })
    }

    cellApiDelete = () => {
        let data = {
            id: this.props.id,
            access_token: Session.get().token.access_token
        }
        destroyGroupUsers(data).then(res => {
            if (res.data.status === 0) {
                this.setState({
                    isDisabled: false
                })
                this.props.cellApiGetListGroupUsers(this.props.page);
                this.success()
            }
        }).catch(e => {
            handleException(e).next()
        })
    }

    success = () => {
        message.success('Delete success');
    };

    error = () => {
        message.error('Delete error');
    };

}

export default DeleteGroupUsere;