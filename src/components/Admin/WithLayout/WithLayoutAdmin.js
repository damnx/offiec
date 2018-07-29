import React, { Component } from 'react';
import Header from '../../Admin/Header/Header';
import Sidebar from '../../Admin/Sidebar/Sidebar';
import Footer from '../../Admin/Footer/Footer';

const WithLayoutAdmin = (Component) => {
    return class extends React.Component {
        render() {
            return (
                <div className='container-scroller'>
                    <Header {...this.props} />
                    <div className='container-fluid page-body-wrapper'>
                        <Sidebar {...this.props} />
                        <div className='main-panel'>
                            <Component {...this.props} />
                            <Footer {...this.props} />
                        </div>
                    </div>
                </div>
            )
        }
    }
}

export default WithLayoutAdmin;