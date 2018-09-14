import React, { Component } from 'react';
import WithLayout from '../../components/WithLayout';
import Clock from '../task/components/clock/Clock';
import ChartjsTask from '../task/components/chartjs/ChartjsTask';
import FormTask from '../task/components/form-task/FormTask';
import './Task.css'

class Task extends Component {
    constructor(props) {
        super(props);
        this.state = {
            inputs: {
                name: undefined,
                link: undefined,
                status: undefined,
                time_comitted: undefined,
                time_start: undefined,
                time_end: undefined
            }
        }
    }

    render() {

        return (
            <div className='container-fluid container-fluid-body'>
                <div className="container">
                    <div className='container-damnx'>
                        <div className="row">
                            <div className='col-lg-12'>
                                <h4 >Task</h4>

                            </div>
                            <div className='col-sm-6'>
                                <Clock />
                                <FormTask
                                    inputs={this.state.inputs}
                                    onChange={this.onChangeFormTask}
                                />
                            </div>
                            <div className='col-sm-6'>
                                <ChartjsTask />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
    onChangeFormTask = (name, value) => {
        this.setState({
            [name]: value
        })
    }
}


export default WithLayout(Task);