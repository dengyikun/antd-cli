import React, {Component, PropTypes}  from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import userAction from '../actions/userAction'

const mapStateToProps = (state) => ({
    user: state.user
})

const mapDispatchToProps = (dispatch) => ({
    userAction: bindActionCreators(userAction, dispatch)
})

class HomeUI extends React.Component{
    static propTypes = {
        user: PropTypes.object.isRequired,
        userAction: PropTypes.object.isRequired
    }//props 类型检查

    render() {
        return (
            <p style={{fontSize: 20}}>
                <strong>{this.props.user.name}</strong>，您好，欢迎使用后台管理系统！
            </p>
        );
    }
}

const Home = connect(
    mapStateToProps,
    mapDispatchToProps
)(HomeUI)

export default Home