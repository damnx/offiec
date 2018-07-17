import React, { Component } from 'react';
import './Loading.css';
import history from '../../utils/history';
// import he

class Loading extends Component {
    constructor(props) {
        super(props)

        this.state = {

        }

    }

    componentDidMount () {
        setTimeout( () => {
            history.push('/')
        },3000 )
    }

    render() {
        return (
            <div>
                <div className="loading-damnx">
                    <ul>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                    </ul>
                </div>
            </div>
        );
    }
}

export default Loading;