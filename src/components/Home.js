import React, {Component, PropTypes}  from 'react'

class Home extends React.Component{
    static propTypes = {}//props 类型检查

    render() {
        return (
            <p style={{fontSize: 20}}>
                您好，欢迎使用管理后台！
            </p>
        );
    }
}

export default Home