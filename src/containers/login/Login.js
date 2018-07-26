import React, { Component } from 'react';
import Loading from '../../components/Loading/Loading';
import './style.css';
import Session from '../../utils/Session';

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
                                />
                            </div>

                            <div className="form-control">
                                <label className="header">Last Name :</label>
                                <input
                                    type="password"
                                    id="lastname"
                                    name="password"
                                    placeholder="Password"
                                    title="Please enter your password"
                                />
                            </div>
                            <input
                                type="submit"
                                className="register"
                                value="Login"
                            />
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

    onClick = () => {
       
    }

    onBlur = (name, value) => {
       
       
    }

    onChange = (name, value) => {
        
    }

    saveForm = () => {
        
    }

    isVali = () => {
       
    }

}

export default Login;