/**
 * Created by 義堃 on 2017/7/5.
 */
import React, {Component, PropTypes} from 'react'
import {BrowserRouter, Route, Redirect} from 'react-router-dom'
import {createBrowserHistory} from 'history'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {Spin, Layout} from 'antd'
import {HTTP, ROUTES} from '../utils'
import uiAction from '../actions/uiAction'
import Login from './Login'
import Menu from './Menu'
import Header from './Header'
import Home from './Home'
import Style from '../assets/styles/components/App.scss'

const Content = Layout.Content

const mapStateToProps = (state) => ({
    user: state.user,
})

const mapDispatchToProps = (dispatch) => ({
    uiAction: bindActionCreators(uiAction, dispatch),
})

class App extends Component {
    static propTypes = {}//props 类型检查

    static defaultProps = {}//默认 props

    static contextTypes = {}//context 显式注册

    constructor(props) {
        super(props)
        this.state = {
            isLoading: false,
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
            this.state.isLoading ?
                <Spin className={Style.loading} spinning={true}/> :
                this.props.user.isLogin ?
                    <BrowserRouter history={createBrowserHistory()}>
                        <Layout className={Style.main + ' ant-layout-has-sider'} size="large">
                            <Route path="/" exact
                                   component={() => <Redirect to={ROUTES.home.url}/>}/>
                            <Route path="/" component={Menu}/>
                            <Layout>
                                <Header/>
                                <Content className={Style.content}>
                                    <div className={Style.contentBody}>
                                        <Route path={ROUTES.home.url} component={Home}/>
                                    </div>
                                </Content>
                            </Layout>
                        </Layout>
                    </BrowserRouter> :
                    <Login/>
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

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App)