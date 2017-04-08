/**
 * Created by DengYiKun on 2017/2/25.
 */
import React, {Component, PropTypes} from 'react'
import {Button} from 'antd'

class TableStatus extends Component {
    static propTypes = {
        status: PropTypes.string.isRequired
    }//props 类型检查

    static defaultProps = {}//默认 props

    constructor(props) {
        super(props)
        this.state = {}
    }//初始化 state

    render() {
        return this.props.status === 'valid' ?
            <Button style={{background: 'green', color: '#fff', borderRadius: 5}}
                    size="small">有效</Button> :
            <Button style={{background: 'red', color: '#fff', borderRadius: 5}}
                    size="small">失效</Button>
    }//渲染
}

export default TableStatus