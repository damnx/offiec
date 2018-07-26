import React, { Component } from 'react';
import './style.css';

class index extends Component {
    constructor(props) {
        super(props)
        this.state = {
            inputs: {
                full_name: undefined,
                email: undefined,
                password: undefined,
                conFirmPassword: undefined,
                address: undefined,
                phone_number: undefined,
                is_active: 1,
                gender: 1
            },
            error: {}
        }
    }

    componentDidMount() {
        // let height = document.getElementById("login-top-dam-left").offsetHeight;
        // document.getElementById("login-top-dam-right").style.height = height + 'px';
        // this.setState({
        //     test: 'test'
        // })
    }

    componentDidUpdate() {
        // let height = document.getElementById("login-top-dam-left").offsetHeight;
        // document.getElementById("login-top-dam-right").style.height = height + 'px';
    }

    render() {
        return (
            <div className='register-damnx'>
                <h1 className="header-w3ls">Signup Form</h1>
                <div className="signup-w3ls">
                    <div className="signup-agile1">
                        <div action="#" method="post">
                            <div className="form-control">
                                <label className="header">Full Name : <span className='span-error-damnx'>*</span></label>
                                <input
                                    type="text"
                                    id="firstname"
                                    name="fullname"
                                    placeholder="Full Name"
                                    title="Please enter your Full Name"
                                    className={this.state.error['full_name'] ? 'input-error-damnx' : ''}
                                    onChange={(e) => this.onChange('full_name', e.target.value)}
                                    onBlur={(e) => this.onBlur('full_name', e.target.value)}
                                    onFocus={(e) => this.onFocus('full_name', e.target.value)}
                                    value={this.state.full_name}
                                    maxLength={255}

                                />
                                {this.state.error['full_name'] && <div className="form-control-feedback-damnx">{this.state.error['full_name']} ?</div>}
                            </div>

                            <div className="form-control">
                                <label className="header">Email Address : <span className='span-error-damnx'>*</span></label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    placeholder="mail@example.com"
                                    title="Please enter a valid email"
                                    className={this.state.error['email'] ? 'input-error-damnx' : ''}
                                    onChange={(e) => this.onChange('email', e.target.value)}
                                    onBlur={(e) => this.onBlur('email', e.target.value)}
                                    onFocus={(e) => this.onFocus('email', e.target.value)}
                                    value={this.state.email}
                                    maxLength={255}
                                />
                                {this.state.error['email'] && <div className="form-control-feedback-damnx">{this.state.error['email']} ?</div>}
                            </div>

                            <div className="form-control">
                                <label className="header">Password :<span className='span-error-damnx'>*</span></label>
                                <input
                                    type="password"
                                    className="lock"
                                    name="password"
                                    placeholder="password"
                                    id="password1"
                                    className={this.state.error['password'] ? 'input-error-damnx' : ''}
                                    onChange={(e) => this.onChange('password', e.target.value)}
                                    onBlur={(e) => this.onBlur('password', e.target.value)}
                                    onFocus={(e) => this.onFocus('password', e.target.value)}
                                    value={this.state.password}
                                    maxLength={255}
                                />
                                {this.state.error['password'] && <div className="form-control-feedback-damnx">{this.state.error['password']} ?</div>}
                            </div>

                            <div className="form-control">
                                <label className="header">Confirm Password :<span className='span-error-damnx'>*</span></label>
                                <input
                                    type="password"
                                    className="lock"
                                    name="confirm-password"
                                    placeholder="confirm password"
                                    id="password2"
                                    className={this.state.error['conFirmPassword'] ? 'input-error-damnx' : ''}
                                    onChange={(e) => this.onChange('conFirmPassword', e.target.value)}
                                    onBlur={(e) => this.onBlur('conFirmPassword', e.target.value)}
                                    onFocus={(e) => this.onFocus('conFirmPassword', e.target.value)}
                                    value={this.state.conFirmPassword}
                                    maxLength={255}
                                />
                                {this.state.error['conFirmPassword'] && <div className="form-control-feedback-damnx">{this.state.error['conFirmPassword']} ?</div>}
                            </div>
                            <div className="form-control">
                                <label className="header">Address :<span className='span-error-damnx'>*</span></label>
                                <input
                                    type="text"
                                    className="lock"
                                    name="address"
                                    placeholder="Address"
                                    id="address"
                                    className={this.state.error['address'] ? 'input-error-damnx' : ''}
                                    onChange={(e) => this.onChange('address', e.target.value)}
                                    onBlur={(e) => this.onBlur('address', e.target.value)}
                                    onFocus={(e) => this.onFocus('address', e.target.value)}
                                    value={this.state.address}
                                    maxLength={255}
                                />
                                {this.state.error['address'] && <div className="form-control-feedback-damnx">{this.state.error['address']} ?</div>}
                            </div>
                            <div className="form-control">
                                <label className="header">Phone number :<span className='span-error-damnx'>*</span></label>
                                <input
                                    type="text"
                                    className="lock"
                                    name="phone_number"
                                    placeholder="Phone number"
                                    id="phone_number"
                                    className={this.state.error['phone_number'] ? 'input-error-damnx' : ''}
                                    onChange={(e) => this.onChange('phone_number', e.target.value)}
                                    onBlur={(e) => this.onBlur('phone_number', e.target.value)}
                                    onFocus={(e) => this.onFocus('phone_number', e.target.value)}
                                    value={this.state.phone_number}
                                    maxLength={11}
                                />
                                {this.state.error['phone_number'] && <div className="form-control-feedback-damnx">{this.state.error['phone_number']} ?</div>}
                            </div>
                            <div className="form-control">
                                <label className={this.state.error['gender'] ? 'input-error-damnx header header-gender' : 'header header-gender'}>Gender :<span className='span-error-damnx '>*</span></label>
                                <div className='mainselection'>
                                    <select
                                        className='gender-damnx'
                                        value={this.state.inputs.gender}
                                        onChange={(e) => this.onChange('gender', e.target.value)}
                                        onBlur={(e) => this.onBlur('gender', e.target.value)}
                                        onFocus={(e) => this.onFocus('gender', e.target.value)}
                                    >
                                        <option value={1}>Male</option>
                                        <option value={2}>Female</option>
                                        <option value={3}>Other gender</option>
                                    </select>
                                </div>
                                {this.state.error['gender'] && <div className="form-control-feedback-damnx">{this.state.error['gender']} ?</div>}
                            </div>
                            <input
                                type="submit"
                                className="register"
                                value="Register"
                                onClick={this.onClick}
                            />
                        </div>
                    </div>
                    <div className="signup-agile2">
                        <h3>Signup With Your Social Accounts</h3>
                        <div className="social-w3ls">
                            <ul className="social-icons">
                                <li><a href=""><i className="fa fa-facebook"></i>Facebook</a></li>
                                <li><a href=""><i className="fa fa-youtube"></i>Youtube</a></li>
                                <li><a href=""><i className="fa fa-twitter"></i>Twitter</a></li>
                                <li><a href=""><i className="fa fa-whatsapp"></i>Whatsapp</a></li>
                                <li><a href=""><i className="fa fa-google-plus"></i>Google</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    onChange = (name, value) => {
        let inputs = this.state.inputs;
        inputs[name] = value;
        this.setState({
            inputs: inputs
        })
    }

    onBlur = (name, value) => {
        let error = this.state.error;
        switch (name) {
            case 'full_name':
                if (!value)
                    error[name] = 'Sorry, please enter a valid full name'
                break;
            case 'email':
                if (!value || !this.checkEmail(value))
                    error[name] = 'Sorry, please enter a valid email'
                break;
            case 'password':
                if (!value)
                    error[name] = 'Sorry, please enter a valid password'
                break;
            case 'conFirmPassword':
                if (!value)
                    error[name] = 'Sorry, please enter a valid confirm password'
                break;
            case 'address':
                if (!value)
                    error[name] = 'Sorry, please enter a valid address'
                break;
            case 'phone_number':
                if (!value || isNaN(value)) {
                    error[name] = 'Sorry, please enter a valid phone number'
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

    onClick = () => {
        let isValid = this.isValid();
        console.log(isValid);
    }

    isValid = () => {
        let status = true;
        let inputs = this.state.inputs;
        let error = this.state.error;

        if (!inputs['full_name']) {
            error['full_name'] = 'Sorry, please enter a valid full name'
            status = false;
        }

        if (!inputs['email'] || !this.checkEmail(inputs['email'])) {
            error['email'] = 'Sorry, please enter a valid full email'
            status = false;
        }

        if (!inputs['password']) {
            error['password'] = 'Sorry, please enter a valid password'
            status = false;
        } else {
            if (!this.checkLength(inputs['password'])) {
                error['password'] = 'Sorry, password is greater than 5 characters'
                status = false;
            }
        }

        if (!inputs['conFirmPassword']) {
            error['conFirmPassword'] = 'Sorry, please enter a valid confirm password'
            status = false;
        }
        else {
            if (inputs['conFirmPassword'] != inputs['password']) {
                error['conFirmPassword'] = 'Sorry, confirm password other password'
                status = false;
            }
        }

        if (!inputs['address']) {
            error['address'] = 'Sorry, please enter a valid address'
            status = false;
        }

        if (!inputs['phone_number']) {
            error['phone_number'] = 'Sorry, please enter a valid phone number'
            status = false;
        }


        this.setState({
            error: error
        })

        return status;
    }

    checkEmail = (email) => {
        let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    checkLength = (value) => {
        let length = value.length;
        if (length < 6)
            return false
        return true
    }

}

export default index;