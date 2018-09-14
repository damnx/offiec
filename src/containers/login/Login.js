import React, { Component } from 'react';
import Loading from '../../components/Loading/Loading';
import './style.css';
import Session from '../../utils/Session';
import { login, me } from '../../modules/user';
import { message, Button } from 'antd';

class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {
            showPassword: false,
            session: Session.get(),
            inputs: {
                email: "",
                password: ""
            },
            error: {},
            isSubmit: false,
            isLoading: false
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
            <div className='Login-register-damnx'>
                <h1 className="header-w3ls">Login Form</h1>
                <div className="signup-w3ls signup-w3ls-login">
                    <div className="signup-agile1">
                        <div action="#" method="post">
                            <div className="form-control">
                                <label className="header">Email :</label>
                                <input
                                    type="text"
                                    id="firstname"
                                    name="email"
                                    placeholder="Email"
                                    title="Please enter your email"
                                    onChange={(e) => this.onChange('email', e.target.value)}
                                    onBlur={(e) => this.onBlur('email', e.target.value)}
                                    onFocus={(e) => this.onFocus('email', e.target.value)}
                                    value={this.state.inputs.email}
                                    maxLength={255}
                                />
                                {this.state.error['email'] && <div className="form-control-feedback-damnx">{this.state.error['email']} ?</div>}
                            </div>

                            <div className="form-control">
                                <label className="header">Last Name :</label>
                                <input
                                    type="password"
                                    id="lastname"
                                    name="password"
                                    placeholder="Password"
                                    title="Please enter your password"
                                    onChange={(e) => this.onChange('password', e.target.value)}
                                    onBlur={(e) => this.onBlur('password', e.target.value)}
                                    onFocus={(e) => this.onFocus('password', e.target.value)}
                                    value={this.state.inputs.password}
                                    maxLength={255}
                                />
                                {this.state.error['password'] && <div className="form-control-feedback-damnx">{this.state.error['password']} ?</div>}
                            </div>
                            {/* <input
                                type="submit"
                                className="register"
                                value="Login"
                                onClick={this.saveForm}
                                disabled={this.state.isSubmit}
                            /> */}
                            <Button
                                className='register'
                                onClick={this.saveForm}
                                disabled={this.state.isSubmit}
                                loading={this.state.isSubmit}
                            >
                                register
                             </Button>
                        </div>
                    </div>
                    <div className="signup-agile2">
                        <h3>Login With Your Social Accounts</h3>
                        <div className="social-w3ls">
                            <ul className="social-icons">
                                <li><a href="#"><i className="fa fa-facebook"></i>Facebook</a></li>
                                <li><a href="#"><i className="fa fa-youtube"></i>Youtube</a></li>
                                <li><a href="#"><i className="fa fa-twitter"></i>Twitter</a></li>
                                <li><a href="#"><i className="fa fa-whatsapp"></i>Whatsapp</a></li>
                                <li><a href="#"><i className="fa fa-google-plus"></i>Google</a></li>
                            </ul>
                        </div>
                    </div>
                </div>

            </div>
        );
    }



    onBlur = (name, value) => {
        let error = this.state.error;
        switch (name) {
            case 'email':
            case 'password':
                if (!value) {
                    error[name] = 'Sorry, please enter a valid ' + name
                }
                break;
            default:
                break
        }
        this.setState({
            error: error
        })
    }

    onFocus = (name, value) => {
        let error = this.state.error;
        delete error[name];
        this.setState({
            ...this.state,
            error: error
        })
    }

    onChange = (name, value) => {
        let inputs = this.state.inputs;
        inputs[name] = value;
        this.setState({
            inputs: inputs
        })
    }

    saveForm = () => {
        let isValid = this.isValid();
        let error = this.state.error;
        if (isValid) {
            this.setState({
                isSubmit: true
            })
            let self = this;
            self.setState({
                isLoading: true
            }, () => {
                this.login().then((session) => {
                    self.setState({
                        logged: true,
                        session: session,
                        percent: 100,
                        isSubmit: false
                    }, () => {
                        setTimeout(() => {
                            self.setState({
                                isLoading: false
                            })
                        }, 300)
                    })
                }).catch(err => {
                    this.error();
                    error['email'] = err.response.data.message;
                    self.setState({
                        error: error,
                        isLoading: false,
                        isSubmit: false
                    })
                })
            })
        }
    }

    login = () => {
        let self = this
        return new Promise((rs, rj) => {
            login(self.state.inputs).then(res => {
                let token = res.data
                let data = {
                    ...self.state.inputs,
                    access_token: token.access_token
                }

                me(data).then(newUser => {
                    sessionStorage.setItem("logged", true);
                    let newSession = {
                        token: token,
                        user: newUser.data
                    };
                    Session.set(newSession)
                    rs(newSession)
                }).catch(err => {
                    rj(err)
                })

            }).catch(err => rj(err))
        })
    }

    error = () => {
        message.error('The user credentials were incorrect. ?');
    };

    isValid = () => {
        let inputs = this.state.inputs;
        let error = this.state.error;
        let status = true;
        if (!inputs['email']) {
            error['email'] = 'Sorry, please enter a valid email';
            status = false;
        }

        if (!inputs['password']) {
            error['password'] = 'Sorry, please enter a valid password';
            status = false;
        }

        this.setState({
            error: error
        })

        return status

    }

}

export default Login;