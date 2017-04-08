import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router'
import {Layout, Menu, Icon} from 'antd'
import Scrollbar from 'react-scrollbar'
import {HTTP, URL} from '../../config'
import styles from './index.scss'

const {Sider} = Layout
const SubMenu = Menu.SubMenu

const mapStateToProps = (state) => ({
    collapsed: state.ui.menuCollapsed,
    user: state.user
})

class MenuUI extends React.Component {
    static propTypes = {
        pathname: PropTypes.string.isRequired,
        collapsed: PropTypes.bool.isRequired,
        user: PropTypes.object.isRequired,
    }
    static contextTypes = {
        router: React.PropTypes.object
    }

    constructor(props) {
        super(props)
        this.state = {
            menus: [
                {
                    name: '首页',
                    icon: 'home',
                    url: URL.home,
                    key: 'M_01',
                    children: []
                },
            ],
            visibleMenus: [],
            menuSelected: [],
            menuOpened: [],
        }
    }//初始化 state

    componentWillMount() {
        //获取可见菜单
        HTTP.get('user_menus', (data) => {
            this.setState({visibleMenus: data})
            this.setMenuSelect()
        })
    }//插入 DOM 前

    componentWillReceiveProps(nextProps) {
        this.setMenuSelect()
    }//接收新 props

    setMenuSelect = () => {
        const router = this.context.router
        let selected = ''
        let opened = ''
        this.state.menus.map((menu) => {
            if (menu.children.length === 0) {
                if (router.isActive(menu.url)) {
                    selected = menu.key
                }
            } else {
                menu.children.map((child) => {
                    if (router.isActive(child.url)) {
                        selected = child.key
                        opened = menu.key
                    }
                })
            }
        })
        this.setState({menuSelected: [selected], menuOpened: [opened]})
    }

    onOpenChange = (openKeys) => {
        openKeys.map((key, index) => {
            if (this.state.menuOpened.includes(key)) {
                openKeys.splice(index, 1)
            }
        })
        this.setState({menuOpened: openKeys})
    }

    render() {
        return (
            <Sider trigger={null} collapsible collapsed={this.props.collapsed}>
                <div className={styles.logo}/>
                <Scrollbar className={styles.menu}>
                    <Menu selectedKeys={this.state.menuSelected} theme="dark"
                          mode={this.props.collapsed ? 'vertical' : 'inline'}
                          openKeys={this.state.menuOpened}
                          onOpenChange={this.onOpenChange}>
                        {
                            this.state.menus.map((menu) => {
                                if (true || this.state.visibleMenus.includes(menu.key)) {
                                    if (menu.children.length === 0) {
                                        return (
                                            <Menu.Item key={menu.key}>
                                                <Link to={menu.url}>
                                                    <Icon className={styles.icon} type={menu.icon}/>
                                                    <span className={styles.title}>
                                                    {menu.name}
                                                </span>
                                                </Link>
                                            </Menu.Item>
                                        )
                                    } else {
                                        return (
                                            <SubMenu key={menu.key} title={
                                                <span>
                                                    <Icon className={styles.icon} type={menu.icon}/>
                                                    <span className={styles.title}>{menu.name}</span>
                                                </span>
                                            }>
                                                {
                                                    menu.children.map((child) => {
                                                        if (true || this.state.visibleMenus.includes(child.key)) {
                                                            return (
                                                                <Menu.Item key={child.key}>
                                                                    <Link to={child.url}>
                                                                        {child.name}
                                                                    </Link>
                                                                </Menu.Item>
                                                            )
                                                        }
                                                    })
                                                }
                                            </SubMenu>
                                        )
                                    }
                                }
                            })
                        }
                    </Menu>
                </Scrollbar>
            </Sider>
        )
    }
}

const AppMenu = connect(
    mapStateToProps
)(MenuUI)

export default AppMenu