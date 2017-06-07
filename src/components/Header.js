import React, {Compontent, PropTypes} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {Layout, Icon} from 'antd'
import uiAction from '../actions/uiAction'
import styles from '../assets/styles/components/Header.scss'

const {Header} = Layout

const mapStateToProps = (state) => ({
    menuCollapsed: state.ui.menuCollapsed,
})

const mapDispatchToProps = (dispatch) => ({
    uiAction: bindActionCreators(uiAction, dispatch),
})

class HeaderUI extends React.Component {
    static propTypes = {
        menuCollapsed: PropTypes.bool.isRequired,
        uiAction: PropTypes.object.isRequired,
    }

    static contextTypes = {
        router: React.PropTypes.object
    }

    constructor(props) {
        super(props)
        this.state = {
            avatar : ''
        }
    }//初始化 state

    componentWillMount() {
        if (window.innerWidth < 767 && this.props.menuCollapsed === false) {
            this.props.uiAction.collapsed()
        } else if (window.innerWidth >= 767 && this.props.menuCollapsed === true) {
            this.props.uiAction.collapsed()
        }
    }//插入 DOM 前

    render() {
        const {menuCollapsed, uiAction} = this.props
        return (
            <Header className={styles.header}>
                <Icon className={styles.trigger} onClick={uiAction.collapsed}
                      type={menuCollapsed ? 'menu-unfold' : 'menu-fold'}/>
            </Header>
        )
    }
}

const AppHeader = connect(
    mapStateToProps,
    mapDispatchToProps
)(HeaderUI)

export default AppHeader