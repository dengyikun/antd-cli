/**
 * Created by Loki on 2017/1/24.
 */
import React, {Component, PropTypes} from 'react'
import {Select} from 'antd'

const Option = Select.Option

class WhetherSelect extends Component {
    static propTypes = {
        // placeholder: PropTypes.string
    }//props 类型检查

    static defaultProps = {}//默认 props

    constructor(props) {
        super(props)
        this.state = {}
    }//初始化 state

    render() {
        return (
            <Select {...this.props}
                    onChange={(value) => {
                        this.props.onChange(value === 'true')
                    }}
                    value={this.props.value ? this.props.value + '' : ''}>
                <Option value="true" key="true">是</Option>
                <Option value="false" key="false">否</Option>
            </Select>
        )
    }//渲染
}

export default WhetherSelect