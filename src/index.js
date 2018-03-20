import React from 'react'
import {render} from 'react-dom'
import {IndexRoute, Router, Route, browserHistory} from 'react-router'
import RouterApp from './modules/PageRouter'
import App from './modules/App'
import Message from './components/Message'
render((
    <Router history={browserHistory}>
        <Route path="/" component={RouterApp}>
            <IndexRoute component={App}/>
            <Route path="/request" component={App}>
                {/*<Route path="/messages" component={Message}/>*/}
            </Route>
            <Route path="/messages" component={Message}/>
        </Route>
    </Router>
), document.getElementById('app'))
