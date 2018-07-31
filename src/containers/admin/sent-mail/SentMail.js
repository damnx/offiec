import React, { Component } from 'react';
import WithLayoutAdmin from '../../../components/Admin/WithLayout/WithLayoutAdmin';
import './style.css';
import { Editor } from 'react-draft-wysiwyg';
import '../../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { Select, Input ,Button} from 'antd';

const Option = Select.Option;
const content = { "entityMap": {}, "blocks": [{ "key": "637gr", "text": "Initialized from content state.", "type": "unstyled", "depth": 0, "inlineStyleRanges": [], "entityRanges": [], "data": {} }] };
const children = [];
for (let i = 10; i < 36; i++) {
    children.push(<Option key={i.toString(36) + i}>{i.toString(36) + i}</Option>);
}


class SentMail extends Component {
    constructor(props) {
        super(props)
        const contentState = content;
        this.state = {
            contentState,
        }
    }


    render() {
        const { contentState } = this.state;
        return (
            <div className="content-wrapper">
                <div className="page-header">
                    <h3 className="page-title">
                        <span className="page-title-icon bg-gradient-primary text-white mr-2">
                            <i className="mdi mdi-email"></i>
                        </span>
                        Sent Mail
                    </h3>
                    <nav aria-label="breadcrumb">
                        <ul className="breadcrumb">
                            <li className="breadcrumb-item active" aria-current="page">
                                <span></span>Overview
                                <i className="mdi mdi-alert-circle-outline icon-sm text-primary align-middle"></i>
                            </li>
                        </ul>
                    </nav>
                </div>

                <div id='tabs-inbox' className="row ">
                    <div className="col-12 grid-margin">
                        <div className='card'>
                            <div className='card-body'>
                                <div className="App">
                                    <div className='form-group'>
                                        <h2>New Message</h2>
                                    </div>
                                    <div className='form-group'>
                                        <Select
                                            mode="tags"
                                            style={{ width: '100%' }}
                                            onChange={this.handleChange}
                                            tokenSeparators={[',']}
                                            placeholder='To'
                                        >
                                            {children}
                                        </Select>
                                    </div>
                                    <div className='form-group'>
                                        <Input placeholder="Subject" />
                                    </div>
                                    <div className='form-group'>
                                        <Editor
                                            wrapperClassName="demo-wrapper"
                                            editorClassName="demo-editor"
                                            onContentStateChange={this.onContentStateChange}
                                            defaultContentState={contentState}
                                            toolbar={{
                                                inline: { inDropdown: true },
                                                list: { inDropdown: true },
                                                textAlign: { inDropdown: true },
                                                link: { inDropdown: true },
                                                history: { inDropdown: true },
                                                // image: { uploadCallback: uploadImageCallBack, alt: { present: true, mandatory: true } },
                                            }}
                                        />
                                    </div>
                                    <div className='form-group'>
                                        <button type="button" className="btn btn-gradient-danger btn-icon-text">
                                            Sent Mail
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    onContentStateChange = (contentState) => {
        this.setState({
            contentState,
        });
    };

    handleChange = (value) => {
        console.log(`selected ${value}`);
    }
}

export default WithLayoutAdmin(SentMail);