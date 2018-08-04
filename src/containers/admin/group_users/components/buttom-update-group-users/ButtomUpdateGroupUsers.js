import React, { Component } from 'react';
import './style.css';
import Session from '../../../../../utils/Session';
import { editGroupUsers } from '../../../../../modules/groupusers';
import { message } from 'antd';
import handleException from '../../../../../utils/handleException';

class ButtomUpdateGroupUsers extends Component {
    constructor(props) {
        super(props)

    }
    render() {
        return (
            <div className='form-group'>
                <button
                    type="button"
                    className="btn btn-gradient-danger mr-2"
                    onClick={this.onClickUpdate}
                    disabled={this.props.isSubmit}
                >
                    Submit
                </button>
            </div>
        );
    }

    onClickUpdate = () => {
        let access_token = Session.get().token.access_token;
        let dataNew = this.props.data;
        let data = {
            'access_token': access_token,
            'id': dataNew.id,
            data: {
                status: this.props.status,
                name: this.props.name,
                nameParent: dataNew.name
            }
        }
        this.props.onChangeUpdate(true)
        editGroupUsers(data).then(res => {
            if (res.data.status === 0) {
                dataNew.status = this.props.status;
                dataNew.name = this.props.name;
                this.props.onChangeUpdate(false, dataNew);
                this.success();
            } else {
                let error = this.props.error;
                for (let i in res.data.error) {
                    error[i] = res.data.error[i]
                }
                this.props.onChangeUpdate(false, null, error);
                this.error();
            }
        }).catch(e => {
            this.props.onChangeUpdate(false)
            handleException(e).next();
        })
    }

    success = () => {
        message.success('Update Group users success');
    };

    error = () => {
        message.error('Update Group users error');
    };

}

export default ButtomUpdateGroupUsers;