import React, { Component } from 'react';
import { Input, Select } from 'antd';

const Option = Select.Option;
const { TextArea } = Input;

class FormTask extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isStop: true
        }
    }

    render() {
        let inputs = this.props.inputs;
        return (
            <div>
                <div className="form-group">
                    <label className="control-label">Task Name <samp className='error-span'>*</samp></label>
                    <Input
                        size="large"
                        placeholder="Task Name"
                        value={inputs['name']}
                        name='nameTask'
                        onChange={(e) => this.onChange('name', e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label className="control-label">link </label>
                    <Input
                        size="large"
                        placeholder="Task Name"
                        name='link'
                        value={inputs['link']}
                        onChange={(e) => this.onChange('link', e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label className="control-label">Status <samp className='error-span'>*</samp></label>
                    <Select
                        showSearch
                        style={{ width: '100%' }}
                        placeholder="Status"
                        optionFilterProp="children"
                        size="large"
                        filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                        value={inputs['status']}
                        onChange={(value) => this.onChange('status', value)}
                    >
                        <Option value={1}>Easily</Option>
                        <Option value={2}>Medium</Option>
                        <Option value={3}>Difficult</Option>
                    </Select>
                </div>

                <div className="form-group">
                    <label className="control-label">Time Comitted <i>(minute)</i> </label>
                    <Input
                        size="large"
                        placeholder="Time Comitted"
                        name='timeComitted'
                        value={inputs['time_comitted']}
                        onChange={(e) => this.onChange('time_comitted', e.target.value)}
                    />
                </div>

                <div className="form-group">
                    <label className="control-label">Description</label>
                    <TextArea
                        placeholder="description"
                        autosize={{ minRows: 2, maxRows: 6 }}
                        value={inputs['description']}
                        onChange={(e) => this.onChange('description', e.target.value)}
                    />
                </div>

                <div className="form-group ">
                    <div className='template-demo mt-4'>
                        {this.renderStartAndStop()}
                        <button
                            type="button"
                            className="btn btn-gradient-danger btn-rounded btn-fw btn-icon-text"
                            disabled
                            onClick={this.onClickSave}
                        >
                            <i className="mdi mdi-content-save"></i>
                            Save
                        </button>
                    </div>
                </div>

            </div>
        );
    }

    renderStartAndStop = () => {
        if (this.state.isStop) {
            return (<button
                type="button"
                className="btn btn-gradient-primary btn-rounded btn-fw btn-icon-text"
                onClick={this.onClickStart}
            >
                <i className="mdi mdi-clock-start"></i>
                Start
            </button>)
        }
        return (<button
            type="button"
            className="btn btn-gradient-primary btn-rounded btn-fw btn-icon-text"
            onClick={this.onClickStop}
        >
            <i className="mdi mdi-stop-circle-outline"></i>
            Stop
        </button>)

    }

    onClickStart = () => {
        this.setState({
            isStop: !this.state.isStop
        })
    }

    onClickStop = () => {
        this.setState({
            isStop: !this.state.isStop
        })
    }

    onChange = (name, value) => {
        let inputs = this.props.inputs;
        console.log(inputs);
        inputs[name] = value;
        this.props.onChange('inputs', inputs)
    }
}

export default FormTask;