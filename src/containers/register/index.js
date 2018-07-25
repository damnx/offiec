import React, { Component } from 'react';
import './style.css';

class index extends Component {
    constructor(props) {
        super(props)
        this.state = {
            test: ''
        }
    }

    render() {
        console.log(this.state.test);
        return (
            <div>
                <h1 className='title-agile text-center'>Impressive Login & Sign up Forms</h1>
                <div className="main-damnx">
                    <div id='login-top-dam-left' className="login-top-dam left">
                        <div className="social_icons-dam">

                            <div className="slide-social-dam w3l">
                                <a href="#">
                                    <div className="button">Facebook</div>
                                    <div className="facebook icon"> <i className="facebook"></i> </div>
                                    <div className="facebook slide-dam">
                                        <p>Facebook</p>
                                    </div>
                                    <div className="clear"></div>
                                </a>
                            </div>

                            <div className="slide-social-dam w3l">
                                <a href="#">
                                    <div className="button">Twitter</div>
                                    <div className="twitter icon"> <i className="twitter"></i></div>
                                    <div className="twitter slide-dam">
                                        <p>Twitter</p>
                                    </div>
                                    <div className="clear"></div>
                                </a>
                            </div>

                        </div>
                        <div>
                            <input type="text" name="name" className="name" placeholder="Your Name" required="" />
                            <input type="text" name="email" className="email" placeholder="Your Email" required="" />
                            <input type="password" name="password" className="password" placeholder="Password" required="" />
                            <input type="password" name="password" className="password" placeholder="Confirm Password" required="" />
                            <input type="submit" value="SIGN UP" />
                        </div>
                    </div>
                    <div id='login-top-dam-right' className="login-top-dam right">
                        <h3>Login</h3>
                        <div>
                            <input type="text" className="email1 " name="password" placeholder="Email" required="" />
                            <input type="password" className="password1" name="password" placeholder="Password" required="" />
                            <input type="checkbox" id="brand" value="" />
                            <label ><span></span> Remember me</label>
                            <div className="login-bottom">
                                <ul>
                                    <li>
                                        <a href="#">Forgot password?</a>
                                    </li>
                                    <li><input type="submit" value="LOGIN" /></li>
                                    <div className="clear"></div>
                                </ul>
                            </div>


                        </div>

                    </div>
                    <div className="clear"></div>
                </div>
            </div>

        );
    }

    componentDidUpdate() {
        let height = document.getElementById("login-top-dam-left").offsetHeight;
        document.getElementById("login-top-dam-right").style.height = height + 'px';
    }

    componentDidMount() {
        let height = document.getElementById("login-top-dam-left").offsetHeight;
        document.getElementById("login-top-dam-right").style.height = height + 'px';
        this.setState({
            test: 'test'
        })
    }
}

export default index;