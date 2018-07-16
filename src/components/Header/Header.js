import React, { Component } from 'react';
import './Header.css';

class Header extends Component {
    render() {
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
                                    <li className="dropdown">
                                        <a className="dropdown-toggle" data-toggle="dropdown" href="#"><i className="fa fa-globe" aria-hidden="true"></i> Language<span className="caret"></span></a>
                                        <ul className="dropdown-menu">
                                            <li><a href="#">Russian</a></li>
                                            <li><a href="#">French</a></li>
                                            <li><a href="#">Mandarin</a></li>
                                            <li><a href="#">Italian</a></li>
                                            <li><a href="#">Gorgean</a></li>
                                        </ul>
                                    </li>

                                    <li className="dropdown">
                                        <a className="" href="#"><i className="fa fa-user" aria-hidden="true"></i> My Account</a>
                                    </li>

                                    <li className="dropdown">
                                        <a className="dropdown-toggle" data-toggle="dropdown" href="#"><i className="fa fa-usd" aria-hidden="true"></i> Currency<span className="caret"></span></a>
                                        <ul className="dropdown-menu">
                                            <li><a href="#">USD</a></li>
                                            <li><a href="#">EUR</a></li>
                                            <li><a href="#">$</a></li>
                                        </ul>
                                    </li>
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
                            </ul>
                            <form className="form-inline my-2 my-lg-0">
                                <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" />
                                <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
                            </form>
                        </div>
                    </div>
                </nav>



            </div>
        );
    }
}

export default Header;