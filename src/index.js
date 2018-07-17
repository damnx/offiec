import React from 'react'
import { render } from 'react-dom'
import { BrowserRouter,Router } from 'react-router-dom'
import App from './containers/app/index';
import history from './utils/history'

render((
    <Router history={history}>
        <App />
    </Router>
    // <BrowserRouter  history={history}>
    //     <App />
    // </BrowserRouter>
), document.getElementById('root'));

