import React from 'react'
import ReactDOM from 'react-dom'
import {createStore, applyMiddleware} from 'redux'
import reducers from './reducers'
import {Provider} from 'react-redux'
import thunk from 'redux-thunk'
import {Router, Route, IndexRoute, hashHistory} from 'react-router'
import {URL} from './config'
import Login from './components/Login'
import App from './components/App'
import Home from './components/Home'
import './assets/styles/main.scss'
import moment from 'moment'
import 'moment/locale/zh-cn'
moment.locale('zh-cn')


const store = createStore(
    reducers,
    applyMiddleware(thunk)
)

ReactDOM.render(
    <Provider store={store}>
        <Router history={hashHistory}>
            <Route path="/">
                <IndexRoute component={Login}/>
                <Route breadcrumbName="Home" component={App}>
                    <Route breadcrumbName="欢迎回来！"  path={URL.home} component={Home}/>
                </Route>
            </Route>
        </Router>
    </Provider>
    , document.getElementById('app'))