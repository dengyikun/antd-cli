import React, {Compontent, PropTypes} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {Icon, Popover, Button} from 'antd'
import uiAction from '../actions/uiAction'
import userAction from '../actions/userAction'
import userAvatar from '../assets/images/user-avatar.png'
import {HTTP} from '../config'
import Style from '../assets/styles/components/Header.scss'

const mapStateToProps = (state) => ({
    menuCollapsed: state.ui.menuCollapsed,
    user: state.user
})

const mapDispatchToProps = (dispatch) => ({
    uiAction: bindActionCreators(uiAction, dispatch),
    userAction: bindActionCreators(userAction, dispatch)
})

class HeaderUI extends React.Component {
    static propTypes = {
        menuCollapsed: PropTypes.bool.isRequired,
        user: PropTypes.object.isRequired,
        uiAction: PropTypes.object.isRequired,
        userAction: PropTypes.object.isRequired
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
        this.getAvatar()
        if (window.innerWidth < 767 && this.props.menuCollapsed === false) {
            this.props.uiAction.collapsed()
        } else if (window.innerWidth >= 767 && this.props.menuCollapsed === true) {
            this.props.uiAction.collapsed()
        }
    }//插入 DOM 前

    getAvatar = () => {
        if (this.props.user.avatar) {
            HTTP.get(this.props.user.avatar, (image) => {
                this.setState({avatar: image.image})
            })
        }
    }

    setMyInfo = () => {
    }

    logout = () => {
        this.props.userAction.userLogout()
        HTTP.loginOut()
    }

    render() {
        const {menuCollapsed, uiAction, user} = this.props
        return (
            <header className={Style.header}>
                <Icon className={Style.trigger} onClick={uiAction.collapsed}
                      type={menuCollapsed ? 'menu-unfold' : 'menu-fold'}/>
                <Popover placement="bottomRight" arrowPointAtCenter overlayClassName={Style.popoverUser}
                         content={
                             <div>
                                 <img className={Style.popoverUserAvatar} src={this.state.avatar}
                                      onError={(e) => {e.target.src=userAvatar}}/>
                                 <div className={Style.popoverUserName}>
                                     {user.name}
                                 </div>
                                 <div className={Style.popoverUserBtn}>
                                     <Button type="primary" onClick={this.setMyInfo}>设置</Button>
                                     &nbsp;
                                     <Button type="ghost" onClick={this.logout}>退出</Button>
                                 </div>
                             </div>
                         }>
                    <div className={Style.item}>
                        <img className={Style.user} src={this.state.avatar}
                             onError={(e) => {e.target.src=userAvatar}}/>
                    </div>
                </Popover>
            </header>
        )
    }
}

const AppHeader = connect(
    mapStateToProps,
    mapDispatchToProps
)(HeaderUI)

export default AppHeader