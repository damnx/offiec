import React, { Component } from 'react';
import WithLayoutAdmin from '../../../components/Admin/WithLayout/WithLayoutAdmin';
import './stype.css';
import XLSX from 'xlsx';

class index extends Component {
    render() {
        return (
            <div className="content-wrapper">
                <div className="page-header">
                    <h3 className="page-title">
                        <span className="page-title-icon bg-gradient-primary text-white mr-2">
                            <i className="fa fa-file-excel-o" aria-hidden="true"></i>
                        </span>
                        Upload Timekeeping File
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
                <div className='col-12 grid-margin stretch-card'>
                    <div className='card'>
                        <div className='card-body'>
                            <h4 className="card-title">Basic form elements</h4>
                            <div className="md-form">
                                <div className="file-field">
                                    <div className="btn btn-rounded purple-gradient btn-sm float-left">
                                        <span>Choose file</span>
                                        <input onChange={(e) => this.onChange(e.target.files)} type="file" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    onChange = (value) => {
        let files = value;
        let file;
        let rABS = false
        if (!files || files.length == 0) return;
        file = files[0];
        let fileReader = new FileReader();
        let _self = this
        fileReader.onload = function (e) {
            let dataBuffer = e.target.result
            let data = new Uint8Array(dataBuffer);
            let workbook = XLSX.read(data, { type: rABS ? 'binary' : 'array' });
            _self.formatDataImport(workbook)
        };
        fileReader.readAsArrayBuffer(file);
    }

    formatDataImport = (workbook) => {
        let data = workbook.Sheets.Sheet;
        delete data['!margins'];
        delete data['!merges'];
        delete data['!ref'];
        for (let i in data) {
            console.log(i)
        }
    }
}

export default WithLayoutAdmin(index)