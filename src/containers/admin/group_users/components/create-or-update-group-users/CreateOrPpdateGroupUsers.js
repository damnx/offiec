import React, { Component } from 'react';
import { Drawer, Select, Input, message } from 'antd';
import { createGroupUsers, editGroupUsers } from '../../../../../modules/groupusers';
import Session from '../../../../../utils/Session';
import handleException from '../../../../../utils/handleException';

const Option = Select.Option;
const { TextArea } = Input;

class CreateOrPpdateGroupUsers extends Component {
    constructor(props) {
        super(props);
        this.state = {
            errors: {},
            isDisabled: false
        }
    }

    render() {
        let name = this.props.inputs['name'];
        let status = this.props.inputs['status'];
        let description = this.props.inputs['description'];
        let errors = this.state.errors;
        return (
            <Drawer
                title="Add Group Users"
                placement="right"
                maskClosable={false}
                onClose={this.onClose}
                visible={this.props.visible}
                width="45%"
                style={{
                    height: 'calc(100% - 55px)',
                    overflow: 'auto',
                    paddingBottom: 53,
                }}
            >
                <div className='row'>
                    <div className="col-lg-12 grid-margin stretch-card">
                        <div className="card">
                            <div className="card-body">
                                <div className='forms-sample'>
                                    <div className="form-group">
                                        <label htmlFor="exampleInputUsername1">Name Group User <span className='error-span'>*</span></label>
                                        <Input
                                            placeholder="Name Group User"
                                            size="large"
                                            value={name}
                                            name='name'
                                            onChange={(e) => this.onChange('name', e.target.value)}
                                            onBlur={(e) => this.onBlur('name', e.target.value)}
                                            onFocus={(e) => this.onFocus('name', e.target.value)}
                                        />
                                        {errors && errors['name'] ? <label className='error-label' >{errors['name']} <span className='error-span'>*</span></label> : ''}
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="exampleInputUsername1">Status <span className='error-span'>*</span></label>
                                        <Select
                                            showSearch
                                            style={{ width: '100%' }}
                                            placeholder="Status"
                                            optionFilterProp="children"
                                            filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                            size="large"
                                            value={status}
                                            name='status'
                                            onChange={(value) => this.onChange('status', value)}
                                            onBlur={(value) => this.onBlur('status', value)}
                                            onFocus={(value) => this.onFocus('status', value)}
                                        >
                                            <Option value="public">Public</Option>
                                            <Option value="pending">Pending</Option>
                                        </Select>
                                        {errors && errors['status'] ? <label className='error-label' >{errors['status']} <span className='error-span'>*</span></label> : ''}
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="exampleInputUsername1">Description</label>
                                        <TextArea
                                            placeholder="Description"
                                            autosize={{ minRows: 2, maxRows: 6 }}
                                            value={description}
                                            onChange={(e) => this.onChange('description', e.target.value)}
                                        />
                                    </div>
                                    <div className="form-group"
                                        style={{
                                            width: '100%',
                                            borderTop: '1px solid #e8e8e8',
                                            padding: '10px 0px',
                                            textAlign: 'right',
                                            left: 0,
                                            borderRadius: '0 0 4px 4px',
                                        }}
                                    >
                                        <button
                                            type="submit"
                                            className="btn btn-gradient-primary mr-2"
                                            onClick={this.cellApiCreateGroupuser}
                                            disabled={this.state.isDisabled}
                                        >
                                            Submit
                                        </button>
                                        <button
                                            className="btn btn-light"
                                            onClick={this.onClose}
                                        >Cancel
                                        </button>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </Drawer>
        );
    }

    onClose = () => {
        this.setState({
            errors: {}
        })
        this.props.onCloseDrawer(false);
    }

    onChange = (name, value) => {
        let inputs = this.props.inputs;
        inputs[name] = value;
        this.props.onChange('inputs', inputs)
    }

    onBlur = (name, value) => {
        let inputs = this.props.inputs;
        let errors = this.state.errors;
        inputs[name] = value;
        if (!inputs[name] || inputs[name] === undefined) {
            errors[name] = "You can't leave this empty"
        }

        this.setState({
            errors: errors
        })

        this.props.onChange('inputs', inputs)
    }

    onFocus = (name, value) => {
        let errors = this.state.errors;
        delete errors[name];
        this.setState({
            errors: errors
        })
    }

    cellApiCreateGroupuser = () => {
        if (!this.isValid()) {
            this.warning();
            return null
        }
        let id = this.props.id;
        let inputs = this.props.inputs;
        let access_token = Session.get().token.access_token;
        let data = {
            access_token: access_token,
            inputs: inputs,
            id: id
        }

        this.setState({
            ...this.state,
            isDisabled: true
        })

        if (id && id != undefined) {
            this.apiUpdate(data);
        } else {
            this.apiCreate(data);
        }

    }

    apiUpdate = (data) => {
        editGroupUsers(data).then(res => {
            if (res.data.status === 0) {
                this.successUpdate();
                this.props.onCloseDrawer(false);
                this.props.cellApiGetListGroupUsers(this.props.page)
                this.setState({
                    ...this.state,
                    isDisabled: false
                })
            } else {
                this.errorUpdate();
                this.setState({
                    ...this.state,
                    isDisabled: false
                })
            }
        }).catch(e => {
            if (e.response.status === 422) {
                let errors = e.response.data.errors;
                this.errorUpdate();
                for (let i in errors) {
                    errors[i] = errors[i][0];
                }
                this.setState({
                    ...this.state,
                    errors: errors,
                    isDisabled: false
                })
            } else {
                handleException(e).next()
            }
        })
    }

    apiCreate = (data) => {
        createGroupUsers(data).then(res => {
            if (res.data.status === 0) {
                this.success();
                this.props.onCloseDrawer(false);
                this.props.cellApiGetListGroupUsers(this.props.page)
                this.setState({
                    ...this.state,
                    isDisabled: false
                })
            } else {
                this.error();
                this.setState({
                    ...this.state,
                    isDisabled: false
                })
            }
        }).catch(e => {
            if (e.response.status === 422) {
                let errors = e.response.data.errors;
                this.error();
                for (let i in errors) {
                    errors[i] = errors[i][0];
                }
                this.setState({
                    ...this.state,
                    errors: errors,
                    isDisabled: false
                })
            } else {
                handleException(e).next()
            }
        })
    }

    warning = () => {
        message.warning("You can't leave this empty");
    }

    error = () => {
        message.error("Create error");

    }
    success = () => {
        message.success('Create success');
    }

    errorUpdate = () => {
        message.error("Update error");

    }
    successUpdate = () => {
        message.success('Update success');
    }

    isValid = () => {
        let inputs = this.props.inputs;
        let errors = this.state.errors;
        let status = true;
        if (!inputs['name']) {
            errors['name'] = "You can't leave this empty";
            status = false;
        }

        if (!inputs['status']) {
            errors['status'] = "You can't leave this empty";
            status = false;
        }

        this.setState({
            errors: errors
        })

        return status
    }
}

export default CreateOrPpdateGroupUsers;