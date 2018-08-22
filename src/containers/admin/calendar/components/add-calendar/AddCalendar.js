import React, { Component } from 'react';
import { Drawer } from 'antd';


class AddCalendar extends Component {
    constructor(props) {
        super(props);

    }

    componentWillMount() {

    }

    componentDidMount() {

    }



    render() {
        return (
            <div>
                <Drawer
                    title="Basic Drawer"
                    width='40%'
                    placement="right"
                    visible={this.props.visible}
                    onClose={this.onClose}
                    maskClosable={false}
                    style={{
                        height: 'calc(100% - 55px)',
                        overflow: 'auto',
                        paddingBottom: 53
                    }}
                >
                    <div className='card'>
                        <div className='card-body'>
                            <div class="card-body">
                                <blockquote class="blockquote blockquote-primary">
                                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante.</p>
                                    <footer class="blockquote-footer">Someone famous in <cite title="Source Title">Source Title</cite></footer>
                                </blockquote>
                            </div>
                        </div>
                    </div>
                </Drawer>
            </div>
        );
    }
}


export default AddCalendar;