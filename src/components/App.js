/**
 * Created by dyk on 2017/1/14.
 */
import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import { Link } from 'react-router'
import AppMenu from './Menu'
import AppHeader from './Header'
import {Layout, Spin, Row, Col, Breadcrumb} from 'antd'
import uiAction from '../actions/uiAction'
import styles from '../assets/styles/components/App.scss'

const {Content} = Layout

const mapStateToProps = (state) => ({
    appLoading: state.ui.appLoading
})

const mapDispatchToProps = (dispatch) => ({
    uiAction: bindActionCreators(uiAction, dispatch),
})

class AppUI extends Component {
    static propTypes = {
        uiAction: PropTypes.object.isRequired,
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
        this.setState({appLoading: false})
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