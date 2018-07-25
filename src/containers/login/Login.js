import React, { Component } from 'react';
import Loading from '../../components/Loading/Loading';
// import './style.css';
import Session from '../../utils/Session';

class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {
            showPassword: false,
            session: Session.get(),
            inputs: {
                username: "",
                password: ""
            },
            error: {}
        }
    }
    render() {
        return (
            <div>
                {this.state.session && this.renderLoading()}
                {!this.state.session && this.rednerLogin()}
            </div>
        );
    }

    renderLoading = () => {
        return (
            <Loading />
        )
    }

    rednerLogin = () => {
        return (
            <div>
                <h1 className="title-agile text-center">Core login form</h1>
                <div className="content-w3ls">
                    <div className="agileits-grid">
                        <div className="content-top-agile">
                            <h2>Login to core</h2>
                        </div>
                        <div className="content-bottom">
                            {this.state.error && this.state.error.login && <div>
                                <br />
                                <div className="notice notice-danger">
                                    <strong>Notice</strong> The user credentials were incorrect.
                            </div>
                            </div>}

                            <div className="field_w3ls">
                                <div className="field-group field-group-error">
                                    <input
                                        name="text"
                                        id="text"
                                        type="text"
                                        value={this.state.inputs.username}
                                        placeholder="username"
                                        required
                                        onChange={e => this.onChange('username', e.target.value)}
                                        className="username-damnx"
                                        onBlur={e => this.onBlur('username', e.target.value)}
                                    />
                                    {this.state.error.username && <span className='fa fa-exclamation-circle'></span>}
                                </div>
                                <div className="field-group field-group-error">
                                    <input
                                        id="password-field"
                                        type={this.state.showPassword ? "text" : "password"}
                                        className="form-control"
                                        value={this.state.inputs.password}
                                        name="password"
                                        placeholder="Password"
                                        onChange={e => this.onChange('password', e.target.value)}
                                        onBlur={e => this.onBlur('username', e.target.value)}
                                    />
                                    {this.state.error.password && <span className='fa fa-exclamation-circle'></span>}
                                    {this.state.inputs.password && <span
                                        onClick={this.onClick}
                                        toggle="#password-field"
                                        className={this.state.showPassword ? "fa fa-fw field-icon toggle-password fa-eye-slash" : "fa fa-fw fa-eye field-icon toggle-password"}>
                                    </span>}

                                </div>
                            </div>
                            <div className="wthree-field">
                                <input id="saveForm" onClick={this.saveForm} name="saveForm" type="submit" value="Login" />
                            </div>
                            <ul className="list-login">
                                <li className="switch-agileits">
                                    <label className="switch">
                                        <input type="checkbox" />
                                        <span className="slider round"></span>
                                        keep me signed in
                                    </label>
                                </li>
                                <li>
                                    <a href="#" className="text-right">forgot password?</a>
                                </li>
                                <li className="clearfix"></li>
                            </ul>
                        </div>

                    </div>
                </div>
                <div className="copyright text-center">
                </div>
            </div>
        );
    }

    onClick = () => {
        this.setState({
            showPassword: !this.state.showPassword
        })
    }

    onBlur = (name, value) => {
        let error = this.state.error;
        // switch (name) {
        //     case 'username':
        //         error[name] = "You can't leave empty username";
        //         break;
        //     case 'password':
        //         error[name] = "You can't leave empty password";
        //         break;
        //     default:
        //         break;
        // }

        this.setState({
            error: error
        })
    }

    onChange = (name, value) => {
        let error = this.state.error;
        switch (name) {
            case 'username':
            case 'password':
                delete error[name];
                delete error['login'];
                break;
            default:
                break;
        }

        this.setState({
            inputs: {
                ...this.state.inputs,
                [name]: value,
            },
            error: error
        })
    }

    saveForm = () => {
        let session = {
            token: {
                access_token:
                    "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6ImExMmJlNmNhMjJhNThjMjdmZmU0ZWNhYThlZmM1MWQzOGViZDIzZDI2NzBiNGJlMDAwYTY5YjE0YWE2MjIxZTgzNmVjOWY2MzM1ZWE3NmU3In0.eyJhdWQiOiIyIiwianRpIjoiYTEyYmU2Y2EyMmE1OGMyN2ZmZTRlY2FhOGVmYzUxZDM4ZWJkMjNkMjY3MGI0YmUwMDBhNjliMTRhYTYyMjFlODM2ZWM5ZjYzMzVlYTc2ZTciLCJpYXQiOjE1MzE4MTI0MjgsIm5iZiI6MTUzMTgxMjQyOCwiZXhwIjoxNTMxOTg1MjI4LCJzdWIiOiI1YWUxODFmOTRjNjU3OC45OTg0MDA5NiIsInNjb3BlcyI6WyIqIl19.5h4yLE59ocIo31FhqV3NinMKK4IalikC97IjFOTQrstokhr0KvXFtnP800Mtui6022rDyUawbxOP6srIThObpPjqe8f_Ngy16HSYlSxkhOM3MtaOa62mdy7kY--7Z8MHffpbpvBm_sdxT955kwrnmrjpHTAypUJTa-rOqQ65H7KPaWIp0EdB8njObbGz24OMbyTUSA_YA_llJyqKZGcLMBuu44BaNLROF3_nBy3Y1yI_w9CBTZnBq5ftYLAB70aVyYFaep9aa6kTW4Z4rKyZT6pH3WChvxRER_SJYk9WKaGUq2D6XM3MyBfCkAFzJo4Y5FBQJb6cSw1qVrnj0ggrhCQ-FBfoHIXKGNYT-S7Cv6vLXDn6K6S3Qqnwy0Pbh1T3Xt19CL1lpM0BeLDTCmBGyl7e19yGs2Jj2yynYqImdVgD0nSxnXPuLc_XBYW5AMC9n_rvwrxKUAoOCNVjZt7ikRhhxFv1EuXG8PpIg4Opljazkdv6Tt6MpJcB91KKXHTDruQ3B-TIMhIpxErVGtME7E8hYnLjcPWkjVBXTQzNVhCKjhxiB58TH-oyy2BFZ0H2miF9iVZj8Dj2bF_QEdblu-9dHKeIuzdwDRY-UegBYuOsUxSrf2_4G8kxHPHQUBS1G7U909DObilxaR4hQev4ZGtTm-N8W0s7z22JjSANcgo",
                expires_in: 172800,
                refresh_token: "def5020002c949f2e1813504d34a62f15fd1735ab4c64089f9f18c8680c735837c4d31d88fd9f83daad68c36902d5028b66f558dcf3ed0848790721098d01b7a48e2c066bddaea2bf03d6df9ca6e384ea0729409d31e28ceb67c54b4a89202252b5f81154956f9dc0599d8b3b8f2e4ed4ea3d25e7e6ad1b95cc721009f10c312c16aae9f219f09e5d6899d5bd6a8f2fb49c98d9e03d4b9a74a373aed200f9272bf26eefb25146518db77adfcda371b6a3549a38f36cd957b82dbbf8069d45fd8db50a341b82b80cd3db37e2b8997267bd994670f1b75ee124acee74ffbf89d922b1c2cda7708ebbff3a0f29abae72c0d1a2b07396005a75ed24cd526932b6564a60ae27b59fa50693fbf01ef0d238c0e4e399d683f02136dac87461340cb9d7bb68e9e433d3bfc92a9d68a184fc56427b5e43b4a3a43c0ca8c8b7896a0c9b1d6de355773a6a086451052c02630ebd76bf8058e466750614664b26387b5e05abd0b9d0349dfbe2ac19a5b3eaf740e2f9f1aaded09f02bbeddaa70",
                token_type: "Bearer"
            },
            user: {
                address: null,
                created_at: "2018-04-26 14:38:33",
                email: "damnx@fingroup.vn",
                fullname: "damnx@fingroup.vn",
                id: "5ae181f94c6578.99840096",
                is_active: false,
                is_online: 0,
                is_sadmin: true,
                job_status: null,
                level: "normal",
                name: "damnx@fingroup.vn",
                phone_number: "1234567890",
                permissions: {
                    CREATE_INVOICE_PAYABLES_SHIPMENT: "CREATE_INVOICE_PAYABLES_SHIPMENT"
                }
            }
        }
        Session.set(session);
        let status = this.isVali();
        let error = this.state.error;
        error['login'] = 'The user credentials were incorrect.'
        if (status) {
            this.setState({
                error: error,
                session: session
            })

        }
    }

    isVali = () => {
        let inputs = this.state.inputs;
        let error = this.state.error;
        let status = true;
        if (!inputs.username) {
            // error['username'] = "You can't leave empty username";
            status = false
        }

        if (!inputs.password) {
            // error['password'] = "You can't leave empty password.";
            status = false
        }

        this.setState({
            ...this.state,
            error: error
        })

        return status
    }

}

export default Login;