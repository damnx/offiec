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
                        Upload File Timekeeping
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
                <div className='row'>
                    <div className='col-12 grid-margin'>
                        <div className='card'>
                            <div className='card-body'>
                                <div className='App'>
                                    <h2>Upload File</h2>
                                    <div className="md-form">
                                        <div className="file-field">
                                            <div className='form-group form-group-upload-file-timekeeping'>
                                                <input onChange={(e) => this.onChange(e.target.files)} type="file" name="file" id="file" className="inputfile" />
                                                <label className='btn btn-gradient-danger btn-icon-text' htmlFor="file"><i className='mdi mdi-upload btn-icon-prepend'></i> Choose a file </label>
                                            </div>
                                        </div>
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
        let sheetNames = workbook.SheetNames[0];
        let data = workbook.Sheets[sheetNames];
        data = XLSX.utils.sheet_to_json(data, { header: 1 });
        console.log(data);
        for (let i in data) {

        }
    }
}

export default WithLayoutAdmin(index)