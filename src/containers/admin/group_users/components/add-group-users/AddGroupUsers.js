import React, { Component } from 'react';
import { Drawer, Select } from 'antd';

const Option = Select.Option;

const children = [];
for (let i = 10; i < 36; i++) {
    children.push(<Option key={i.toString(36) + i}>{i.toString(36) + i}</Option>);
}

function handleChange(value) {
    console.log(`selected ${value}`);
}

class AddGroupUsers extends Component {
    constructor(props) {
        super(props);

    }

    render() {
        return (
            <Drawer
                title="Add Group Users"
                placement="right"
                closable={false}
                onClose={this.onClose}
                visible={this.props.visible}
                width="45%"
            >
                <div className='row'>
                    <div className="col-lg-12 grid-margin stretch-card">
                        <div className="card">
                            <div className="card-body">
                                <div className='forms-sample'>
                                    <div className="form-group">
                                        <label htmlFor="exampleInputUsername1">Name Group User</label>
                                        <input type="text" className="form-control" id="exampleInputUsername1" placeholder="Username" />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="exampleInputUsername1">Name Group User</label>
                                        <Select
                                            mode="tags"
                                            style={{ width: '100%' }}
                                            onChange={handleChange}
                                            tokenSeparators={[',']}
                                            placeholder="Please select"
                                        >
                                            {children}
                                        </Select>
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
        this.props.onCloseDrawer(false);
    }
}

export default AddGroupUsers;