import React, {Compontent, PropTypes} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {Layout, Icon, Popover, Button, Badge} from 'antd'
import uiAction from '../../actions/uiAction'
import userAction from '../../actions/userAction'
import userAvatar from '../../assets/images/user-avatar.png'
import {HTTP, ENUM, URL} from '../../config'
import styles from './index.scss'

const {Header} = Layout

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
        this.context.router.push(URL.myInfo)
    }

    logout = () => {
        this.props.userAction.userLogout()
        HTTP.loginOut()
    }

    render() {
        const {menuCollapsed, uiAction, user} = this.props
        return (
            <Header className={styles.header}>
                <Icon className={styles.trigger} onClick={uiAction.collapsed}
                      type={menuCollapsed ? 'menu-unfold' : 'menu-fold'}/>
                <Popover placement="bottomRight" arrowPointAtCenter overlayClassName={styles.popoverUser}
                         content={
                             <div>
                                 <img className={styles.popoverUserAvatar} src={this.state.avatar}
                                      onError={(e) => {e.target.src=userAvatar}}/>
                                 <div className={styles.popoverUserName}>
                                     {user.name}
                                     </div>
                                 <div className={styles.popoverUserBtn}>
                                     <Button type="primary" onClick={this.setMyInfo}>设置</Button>
                                     &nbsp;
                                     <Button type="ghost" onClick={this.logout}>退出</Button>
                                 </div>
                             </div>
                         }>
                    <div className={styles.item}>
                        <img className={styles.user} src={this.state.avatar}
                             onError={(e) => {e.target.src=userAvatar}}/>
                    </div>
                </Popover>
            </Header>
        )
    }
}

const AppHeader = connect(
    mapStateToProps,
    mapDispatchToProps
)(HeaderUI)

export default AppHeader