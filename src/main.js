import React, {Component, PropTypes} from 'react'
import ReactDOM from 'react-dom'
import {createStore, applyMiddleware} from 'redux'
import reducers from './reducers'
import {Provider} from 'react-redux'
import thunk from 'redux-thunk'
import moment from 'moment'
import App from './components/App'
import './assets/styles/main.scss'
import 'moment/locale/zh-cn'
moment.locale('zh-cn')

const store = createStore(
    reducers,
    applyMiddleware(thunk)
)

ReactDOM.render(
    <Provider store={store}>
        <App/>
    </Provider>, document.querySelector('#main'))