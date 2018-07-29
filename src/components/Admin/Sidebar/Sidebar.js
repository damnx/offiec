import React, { Component } from 'react';
import avata from '../Header/face1.jpg';
import './style.css';
import { Link } from "react-router-dom";

class Sidebar extends Component {
    constructor(props) {
        super(props)

    }

    render() {
        console.log(this.props)
        let path = this.props.path;
        return (
            <div className='sidebar-damnx-fingroup'>
                <nav className="sidebar sidebar-offcanvas" id="sidebar">
                    <ul className="nav">
                        <li className="nav-item nav-profile">
                            <a href="#" className="nav-link">
                                <div className="nav-profile-image">
                                    <img src={avata} alt="profile" />
                                    <span className="login-status online"></span>
                                </div>
                                <div className="nav-profile-text d-flex flex-column">
                                    <span className="font-weight-bold mb-2">David Grey. H</span>
                                    <span className="text-secondary text-small">Project Manager</span>
                                </div>
                                <i className="mdi mdi-bookmark-check text-success nav-profile-badge"></i>
                            </a>
                        </li>
                        <li className={path === '/admin.html' ? 'nav-item active' : 'nav-item'}>
                            <Link className="nav-link" to="/admin.html">
                                <span className="menu-title">Dashboard</span>
                                <i className="mdi mdi-home menu-icon"></i>
                            </Link>

                        </li>
                        <li className="nav-item active">
                            <a className="nav-link" data-toggle="collapse" href="#ui-basic" aria-expanded="false" aria-controls="ui-basic">
                                <span className="menu-title">Email</span>
                                <i className="menu-arrow"></i>
                                <i className="mdi mdi-email menu-icon"></i>
                            </a>
                            <div className="collapse show" id="ui-basic">
                                <ul className="nav flex-column sub-menu">
                                    <li className="nav-item">
                                        <Link className="nav-link nav-link-damnx-email active " to="/inbox.html">Inbox</Link>
                                        <span className='number-email badge-warning'>5</span>
                                    </li>
                                    <li className="nav-item"> <a className="nav-link nav-link-damnx-email" href="pages/ui-features/typography.html">Sent Mail</a></li>
                                    <li className="nav-item"> <a className="nav-link nav-link-damnx-email" href="pages/ui-features/typography.html">Important</a></li>
                                    <li className="nav-item"> <a className="nav-link nav-link-damnx-email" href="pages/ui-features/typography.html">Trash</a></li>
                                </ul>
                            </div>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="pages/icons/mdi.html">
                                <span className="menu-title">Icons</span>
                                <i className="mdi mdi-contacts menu-icon"></i>
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="pages/forms/basic_elements.html">
                                <span className="menu-title">Forms</span>
                                <i className="mdi mdi-format-list-bulleted menu-icon"></i>
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="pages/charts/chartjs.html">
                                <span className="menu-title">Charts</span>
                                <i className="mdi mdi-chart-bar menu-icon"></i>
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="pages/tables/basic-table.html">
                                <span className="menu-title">Tables</span>
                                <i className="mdi mdi-table-large menu-icon"></i>
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" data-toggle="collapse" href="#general-pages" aria-expanded="false" aria-controls="general-pages">
                                <span className="menu-title">Sample Pages</span>
                                <i className="menu-arrow"></i>
                                <i className="mdi mdi-medical-bag menu-icon"></i>
                            </a>
                            <div className="collapse" id="general-pages">
                                <ul className="nav flex-column sub-menu">
                                    <li className="nav-item"> <a className="nav-link" href="pages/samples/blank-page.html"> Blank Page </a></li>
                                    <li className="nav-item"> <a className="nav-link" href="pages/samples/login.html"> Login </a></li>
                                    <li className="nav-item"> <a className="nav-link" href="pages/samples/register.html"> Register </a></li>
                                    <li className="nav-item"> <a className="nav-link" href="pages/samples/error-404.html"> 404 </a></li>
                                    <li className="nav-item"> <a className="nav-link" href="pages/samples/error-500.html"> 500 </a></li>
                                </ul>
                            </div>
                        </li>
                        <li className="nav-item sidebar-actions">
                            <span className="nav-link">
                                <div className="border-bottom">
                                    <h6 className="font-weight-normal mb-3">Projects</h6>
                                </div>
                                <button className="btn btn-block btn-lg btn-gradient-primary mt-4">+ Add a project</button>
                                <div className="mt-4">
                                    <div className="border-bottom">
                                        <p className="text-secondary">Categories</p>
                                    </div>
                                    <ul className="gradient-bullet-list mt-4">
                                        <li>Free</li>
                                        <li>Pro</li>
                                    </ul>
                                </div>
                            </span>
                        </li>
                    </ul>
                </nav>
            </div>
        );
    }
}

export default Sidebar;