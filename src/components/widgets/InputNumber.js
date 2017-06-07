/**
 * Created by DengYiKun on 2017/2/17.
 */
import React, {Component, PropTypes} from 'react'
import {InputNumber} from 'antd'

export default class extends Component {
    static propTypes = {}//props 类型检查

    static defaultProps = {}//默认 props

    constructor(props) {
        super(props)
        this.state = {}
    }//初始化 state

    render() {
        return (
            <InputNumber {...this.props}
                        onChange={(value) => {
                            if (!value && value !== 0) {
                                value = null
                            }
                            this.props.onChange(value)
                        }}/>
        )
    }//渲染
}