/**
 * Created by DengYiKun on 2017/2/25.
 */
import React, {Component, PropTypes} from 'react'
import {Modal, message} from 'antd'
import {HTTP} from './../../config'

class TableStatusChange extends Component {
    static propTypes = {
        url: PropTypes.string.isRequired,
        status: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        callback: PropTypes.func.isRequired,
    }//props 类型检查

    static defaultProps = {}//默认 props

    constructor(props) {
        super(props)
        this.state = {}
    }//初始化 state

    invalid = () => {
        Modal.confirm({
            title: `确认失效${this.props.name}？`,
            onOk: () => {
                return new Promise((resolve, reject) => {
                    HTTP.patch(this.props.url, {status: 'invalid'}, () => {
                        message.success(`${this.props.name}失效成功！`)
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

    valid = () => {
        Modal.confirm({
            title: `确认生效${this.props.name}？`,
            onOk: () => {
                return new Promise((resolve, reject) => {
                    HTTP.patch(this.props.url, {status: 'valid'}, () => {
                        message.success(`${this.props.name}生效成功！`)
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
        return this.props.status === 'valid' ?
            <a onClick={this.invalid}>失效</a> :
            <a onClick={this.valid}>生效</a>
    }//渲染
}

export default TableStatusChange