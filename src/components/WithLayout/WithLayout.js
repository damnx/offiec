import React from 'react';

import Header from '../../components/Header/Header';
// import Sidebar from '../../components/Sidebar/'
// import Aside from '../../components/Aside/'
import Footer from '../../components/Footer';

const WithLayout = (Component) => {
    return class extends React.Component {
        render() {
            return (
                <div>
                    <Header {...this.props} />
                    <div className="app-body">
                        {/* <Sidebar session={this.props.session} /> */}
                        <div className="">
                            <Component {...this.props} />
                        </div>
                    </div>
                    <Footer />
                </div>
            )
        }
    }
}

export default WithLayout;