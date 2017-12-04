/**
 * Created by DengYiKun on 2017/2/25.
 */
import React, {Component, PropTypes} from 'react'
import {Modal, message} from 'antd'
import {HTTP} from './../../utils'

class TableDelete extends Component {
    static propTypes = {
        url: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        callback: PropTypes.func.isRequired,
    }//props 类型检查

    static defaultProps = {}//默认 props

    constructor(props) {
        super(props)
        this.state = {}
    }//初始化 state

    onClick = () => {
        Modal.confirm({
            title: `确认删除${this.props.name}？`,
            content: `${this.props.name}删除后将无法找回！`,
            onOk: () => {
                return new Promise((resolve, reject) => {
                    HTTP.delete(this.props.url, () => {
                        message.success(`${this.props.name}删除成功！`)
                        this.props.callback()
                        resolve()
                    }, () => {
                        this.props.callback()
                        resolve()
                    })
                }).catch(() => console.log('Oops errors!'));
            }
        })
    }

    render() {
        return <a onClick={this.onClick}>删除</a>
    }//渲染
}

export default TableDelete