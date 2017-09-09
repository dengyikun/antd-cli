/**
 * Created by 義堃 on 2017/7/5.
 */
import React, {Component, PropTypes} from 'react'
import {createStore, applyMiddleware} from 'redux'
import reducers from '../reducers'
import {Provider} from 'react-redux'
import thunk from 'redux-thunk'
import {BrowserRouter, Route, Redirect} from 'react-router-dom'
import {createBrowserHistory} from 'history'
import {Spin, Layout, Row, Col} from 'antd'
import {HTTP, ROUTES} from '../config'
import Header from './Header'
import Menu from './Menu'
import AppHeader from './Header'
import Style from '../assets/styles/components/App.scss'

const Content = Layout.Content

const store = createStore(
    reducers,
    applyMiddleware(thunk)
)


class App extends Component {
    static propTypes = {}//props 类型检查

    static defaultProps = {}//默认 props

    static contextTypes = {}//context 显式注册

    constructor(props) {
        super(props)
        this.state = {
            isLoading: false,
            quotation: this.defaultQuotation
        }
    }//初始化 state

    componentWillMount() {
        //HTTP.getSitemap(() => {
        //    this.setState({isLoading: false})
        //    return true
        //})
    }//插入 DOM 前

    componentWillReceiveProps(nextProps) {
    }//接收新 props

    render() {
        return (
            <BrowserRouter history={createBrowserHistory()}>
                <Provider store={store}>
                    {
                        this.state.isLoading ?
                            <Spin className={Style.loading} spinning={true}/> :
                            <Layout className={Style.main + ' ant-layout-has-sider'} size="large">
                                <Route path="/" component={Menu}/>
                                <Layout>
                                    <AppHeader/>
                                    <Content className={Style.content}>
                                    </Content>
                                </Layout>
                            </Layout>
                    }
                </Provider>
            </BrowserRouter>
        )
    }//渲染

    componentDidMount() {
    }//插入 DOM 后

    shouldComponentUpdate(nextProps, nextState) {
        return true
    }//更新判断

    componentWillUpdate(nextProps, nextState) {
    }//更新前

    componentDidUpdate(prevProps, prevState) {
    }//更新后

    componentWillUnmount() {
    }//卸载前
}

export default App