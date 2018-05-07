import React, {Component} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {Layout, Menu, Icon} from 'antd'
import Scrollbar from 'react-scrollbar'
import {ROUTES} from '../utils'
import uiAction from '../actions/uiAction'
import Style from '../assets/styles/components/Menu.scss'

const {Sider} = Layout
const SubMenu = Menu.SubMenu

const mapStateToProps = (state) => ({
    collapsed: state.ui.menuCollapsed,
})

const mapDispatchToProps = (dispatch) => ({
    uiAction: bindActionCreators(uiAction, dispatch),
})

class AppMenu extends React.Component {
    static propTypes = {
    }
    static contextTypes = {}

    constructor(props) {
        super(props)
        this.state = {
            menus: [
                {
                    name: ROUTES.home.name,
                    icon: 'home',
                    url: ROUTES.home.url
                },
            ],
            menuSelected: [],
            menuOpened: [],
        }
    }//初始化 state

    componentWillMount() {
        this.setMenuSelect()
    }//插入 DOM 前

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.location.pathname !== this.props.location.pathname) {
            this.setMenuSelect()
        }
    }//更新后

    openMenu = () => {
        if (this.props.collapsed) {
            this.props.uiAction.collapsed()
        }
    }

    setMenuSelect = () => {
        const pathname = this.props.location.pathname
        let selected = ''
        let opened = ''
        this.state.menus.map((menu) => {
            if (menu.children) {
                menu.children.map((child) => {
                    if (pathname.includes(child.url)) {
                        selected = child.url
                        opened = menu.url
                    }
                })
            } else {
                if (pathname.includes(menu.url)) {
                    selected = menu.url
                }
            }
        })
        this.setState({menuSelected: [selected], menuOpened: [opened]})
    }

    onOpenChange = (openKeys) => {
        if (!this.props.collapsed) {
            if (openKeys.length == 1) {
                this.setState({menuOpened: openKeys})
            } else if (openKeys.length > 1) {
                openKeys.map((key, index) => {
                    if (this.state.menuOpened.includes(key)) {
                        openKeys.splice(index, 1)
                    }
                })
                this.setState({menuOpened: openKeys})
            }
        }
    }

    render() {
        return (
            <Sider trigger={null} collapsible collapsed={this.props.collapsed}
                   onClick={this.openMenu}>
                <div className={Style.logo}/>
                <Scrollbar className={Style.menu}>
                    <Menu theme="dark"
                          mode={this.props.collapsed ? 'vertical' : 'inline'}
                          selectedKeys={this.state.menuSelected}
                          openKeys={this.state.menuOpened}
                          onOpenChange={this.onOpenChange}>
                        {
                            this.state.menus.map((menu) =>
                                menu.children ?
                                    <SubMenu key={menu.url} title={
                                        <span>
                                            <Icon className={Style.icon} type={menu.icon}/>
                                            <span className={Style.title}>{menu.name}</span>
                                        </span>
                                    }>
                                        {
                                            menu.children.map((child) =>
                                                <Menu.Item key={child.url}>
                                                    <Link to={child.url}>
                                                        {child.name}
                                                    </Link>
                                                </Menu.Item>
                                            )
                                        }
                                    </SubMenu> :
                                    <Menu.Item key={menu.url}>
                                        <Link to={menu.url}>
                                            <Icon className={Style.icon} type={menu.icon}/>
                                            <span className={Style.title}>
                                                {menu.name}
                                            </span>
                                        </Link>
                                    </Menu.Item>
                            )
                        }
                    </Menu>
                </Scrollbar>
            </Sider>
        )
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AppMenu)