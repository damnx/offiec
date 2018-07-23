import React, { Component } from 'react';
import Header from '../../Admin/Header/Header';
import Sidebar from '../../Admin/Sidebar/Sidebar';
import Footer from '../../Admin/Footer/Footer';

const WithLayoutAdmin = (Component) => {
    return class extends React.Component {
        render() {
            return (
                <div className='container-scroller'>
                    <Header session={this.props.session} />
                    <div className='container-fluid page-body-wrapper'>
                        <Sidebar session={this.props.session} />
                        <div className='main-panel'>
                            <Component {...this.props} />
                            <Footer session={this.props.session} />
                        </div>
                    </div>
                </div>
            )
        }
    }
}

export default WithLayoutAdmin;