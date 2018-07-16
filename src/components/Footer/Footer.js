import React, { Component } from 'react';
import './Footer.css';

class Footer extends Component {
    render() {
        return (
            <div className="footer">
                <div className="container">
                    <div className="row">
                        <div className="col-sm-3">
                            <h4 className="title">Sumi</h4>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin suscipit, libero a molestie consectetur, sapien elit lacinia mi.</p>
                            <ul className="social-icon">
                                <a href="#" className="social"><i className="fa fa-facebook" aria-hidden="true"></i></a>
                                <a href="#" className="social"><i className="fa fa-twitter" aria-hidden="true"></i></a>
                                <a href="#" className="social"><i className="fa fa-instagram" aria-hidden="true"></i></a>
                                <a href="#" className="social"><i className="fa fa-youtube-play" aria-hidden="true"></i></a>
                                <a href="#" className="social"><i className="fa fa-google" aria-hidden="true"></i></a>
                                <a href="#" className="social"><i className="fa fa-dribbble" aria-hidden="true"></i></a>
                            </ul>
                        </div>
                        <div className="col-sm-3">
                            <h4 className="title">My Account</h4>
                            <span className="acount-icon">
                                <a href="#"><i className="fa fa-heart" aria-hidden="true"></i> Wish List</a>
                                <a href="#"><i className="fa fa-cart-plus" aria-hidden="true"></i> Cart</a>
                                <a href="#"><i className="fa fa-user" aria-hidden="true"></i> Profile</a>
                                <a href="#"><i className="fa fa-globe" aria-hidden="true"></i> Language</a>
                            </span>
                        </div>
                        <div className="col-sm-3">
                            <h4 className="title">Category</h4>
                            <div className="category">
                                <a href="#">men</a>
                                <a href="#">women</a>
                                <a href="#">boy</a>
                                <a href="#">girl</a>
                                <a href="#">bag</a>
                                <a href="#">teshart</a>
                                <a href="#">top</a>
                                <a href="#">shos</a>
                                <a href="#">glass</a>
                                <a href="#">kit</a>
                                <a href="#">baby dress</a>
                                <a href="#">kurti</a>
                            </div>
                        </div>
                        <div className="col-sm-3">
                            <h4 className="title">Payment Methods</h4>
                            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
                            <ul className="payment">
                                <li><a href="#"><i className="fa fa-cc-amex" aria-hidden="true"></i></a></li>
                                <li><a href="#"><i className="fa fa-credit-card" aria-hidden="true"></i></a></li>
                                <li><a href="#"><i className="fa fa-paypal" aria-hidden="true"></i></a></li>
                                <li><a href="#"><i className="fa fa-cc-visa" aria-hidden="true"></i></a></li>
                            </ul>
                        </div>
                    </div>
                    <hr />
                    <div className="row text-center"> © 2017. Made with  by damnx.</div>
                </div>
            </div>

        );
    }
}

export default Footer;