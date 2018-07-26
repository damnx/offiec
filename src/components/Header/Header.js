import React, { Component } from 'react';
import './Header.css';
import Session from '../../utils/Session';

class Header extends Component {
    render() {
        this.renderUser();
        return (
            <div>
                <nav className="top-bar top-bar-damnx">
                    <div className="container">
                        <div className="row">
                            <div className="col-sm-4 hidden-xs">
                                <span className="nav-text">
                                    <i className="fa fa-phone" aria-hidden="true"></i>  +123 4567 8910
                                    <i className="fa fa-envelope" aria-hidden="true"></i> damnx@fingroup.vn</span>
                            </div>
                            <div className="col-sm-4 text-center">
                                <a href="#" className="social"><i className="fa fa-facebook" aria-hidden="true"></i></a>
                                <a href="#" className="social"><i className="fa fa-twitter" aria-hidden="true"></i></a>
                                <a href="#" className="social"><i className="fa fa-instagram" aria-hidden="true"></i></a>
                                <a href="#" className="social"><i className="fa fa-youtube-play" aria-hidden="true"></i></a>
                                <a href="#" className="social"><i className="fa fa-google" aria-hidden="true"></i></a>
                                <a href="#" className="social"><i className="fa fa-dribbble" aria-hidden="true"></i></a>
                            </div>
                            <div className="col-sm-4 text-right hidden-xs">
                                <ul className="tools">
                                    {this.renderUser()}
                                </ul>
                            </div>
                        </div>
                    </div>
                </nav>
                <nav className="navbar navbar-expand-lg navbar-light navbar-inverse-damnx">
                    <div className='container'>
                        {/* <a className="navbar-brand" href="#">Navbar</a> */}
                        <a className="navbar-brand" href="#"><img src="https://lh3.googleusercontent.com/-N4NB2F966TU/WM7V1KYusRI/AAAAAAAADtA/fPvGVNzOkCo7ZMqLI6pPITE9ZF7NONmawCJoC/w185-h40-p-rw/logo.png" /></a>
                        <button className="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul className="navbar-nav mr-auto">
                                <li className="nav-item active">
                                    <a className="nav-link" href="#">Home <span className="sr-only">(current)</span></a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="#">Link</a>
                                </li>
                                <li className="nav-item dropdown">
                                    <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        Dropdown
                                    </a>
                                    <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                                        <a className="dropdown-item" href="#">Action</a>
                                        <a className="dropdown-item" href="#">Another action</a>
                                        <div className="dropdown-divider"></div>
                                        <a className="dropdown-item" href="#">Something else here</a>
                                    </div>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link disabled" href="#">Disabled</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link disabled" href="/admin.html"><i className="fa fa-cloud-upload" aria-hidden="true"></i></a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
            </div>
        );
    }

    renderUser = () => {
        let session = Session.get('session');
        if (session) {
            let user = session.user;
            return (
                <li className="dropdown">
                    <a className="dropdown-toggle" data-toggle="dropdown" href="#"><i className="fa fa-user" aria-hidden="true"></i> Welcome : {user.name}<span className="caret"></span></a>
                    <ul className="dropdown-menu">
                        <li><a href="#"><i className="fa fa-address-card-o" aria-hidden="true"></i> Profile</a></li>
                        <li><a href="#"><i className="fa fa-circle-o-notch" aria-hidden="true"></i> Log out</a></li>
                    </ul>
                </li>
            );
        }

        return (<div>
            <li className="dropdown">
                <a className="" href="/login.html"><i className="fa fa-sign-in" aria-hidden="true"></i> Login</a>
            </li>
            <li className="dropdown">
                <a className="" href="/register.html"><i className="fa fa-address-card" aria-hidden="true"></i> Sign up</a>
            </li>
        </div>);
    }

}

export default Header;