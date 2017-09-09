import React, {Component, PropTypes} from 'react'
import ReactDOM from 'react-dom'
import moment from 'moment'
import App from './components/App'
import './assets/styles/main.scss'
import 'moment/locale/zh-cn'
moment.locale('zh-cn')

ReactDOM.render(<App/>, document.querySelector('#main'))