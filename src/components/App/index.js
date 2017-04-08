/**
 * Created by dyk on 2017/1/14.
 */
import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import { Link } from 'react-router'
import AppMenu from '../Menu'
import AppHeader from '../Header'
import {Layout, Spin, Row, Col, Breadcrumb} from 'antd'
import ReactScrollbar from 'react-scrollbar'
import uiAction from '../../actions/uiAction'
import userAction from '../../actions/userAction'
import {HTTP} from '../../config'
import styles from './index.scss'

const {Content} = Layout

const mapStateToProps = (state) => ({
    appLoading: state.ui.appLoading
})

const mapDispatchToProps = (dispatch) => ({
    uiAction: bindActionCreators(uiAction, dispatch),
    userAction: bindActionCreators(userAction, dispatch)
})

class AppUI extends Component {
    static propTypes = {
        uiAction: PropTypes.object.isRequired,
        userAction: PropTypes.object.isRequired
    }

    static contextTypes = {
        router: React.PropTypes.object
    }


    constructor(props) {
        super(props)
        this.state = {
            appLoading: true
        }
    }

    componentWillMount() {
        HTTP.getSitemap(() => {
            //获取用户信息
            HTTP.get('user_info', (data) => {
                this.props.userAction.setUser(data)
                this.setState({appLoading: false})
            })
        })
    }//插入 DOM 前

    getContentName = () => {
        const routes = this.context.router.routes.slice()
        for (let i = routes.length - 1; i >= 0; i--) {
            if (routes[i].breadcrumbName) {
                return routes[i].breadcrumbName
            }
        }
    }

    itemRender = (route, params, routes, paths) => {
        if (route.breadcrumbName === 'Home') {
            paths = ['home']
        }
        return <Link to={paths.join('')}>{route.breadcrumbName}</Link>
    }

    render() {
        return (
            this.state.appLoading ?
                <Spin className={styles.loading}/> :
                <Layout className={styles.main + ' ant-layout-has-sider'} size="large">
                    <AppMenu pathname={this.props.location.pathname}/>
                    <Layout>
                        <AppHeader/>
                        <Content className={styles.content}>
                            {/*<ReactScrollbar*/}
                            {/*speed={0.8}*/}
                            {/*horizontal={false}*/}
                            {/*>*/}
                            <div className={styles.header}>
                                <Row gutter={20}>
                                    <Col md={8} xs={24}>
                                        <h1>{this.getContentName()}</h1>
                                    </Col>
                                    <Col md={16} xs={24}>
                                        <Breadcrumb itemRender={this.itemRender}
                                                    routes={this.context.router.routes}
                                                    params={this.context.router.params}
                                                    className={styles.breadcrumb}/>
                                    </Col>
                                </Row>
                            </div>
                            {this.props.children}
                            {/*</ReactScrollbar>*/}
                        </Content>
                    </Layout>
                </Layout>

        )
    }
}

const App = connect(
    mapStateToProps,
    mapDispatchToProps
)(AppUI)

export default App