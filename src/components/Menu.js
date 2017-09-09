import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {Layout, Menu, Icon} from 'antd'
import Scrollbar from 'react-scrollbar'
import {ROUTES} from '../config'
import styles from '../assets/styles/components/Menu.scss'

const {Sider} = Layout
const SubMenu = Menu.SubMenu

const mapStateToProps = (state) => ({
    collapsed: state.ui.menuCollapsed,
})

class AppMenu extends React.Component {
    static propTypes = {
        collapsed: PropTypes.bool.isRequired,
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

    setMenuSelect = () => {
        const pathname = this.props.location.pathname
        let selected = ''
        let opened = ''
        this.state.menus.map((menu) => {
            if (menu.children) {
                menu.children.map((child) => {
                    if (pathname === child.url) {
                        selected = child.url
                        opened = menu.url
                    }
                })
            } else {
                if (pathname === menu.url) {
                    selected = menu.url
                }
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
                            this.state.menus.map((menu) =>
                                menu.children ?
                                    <SubMenu key={menu.key} title={
                                        <span>
                                            <Icon className={styles.icon} type={menu.icon}/>
                                            <span className={styles.title}>{menu.name}</span>
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
                                            <Icon className={styles.icon} type={menu.icon}/>
                                            <span className={styles.title}>
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
    mapStateToProps
)(AppMenu)