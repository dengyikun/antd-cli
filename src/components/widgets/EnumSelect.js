/**
 * Created by Loki on 2017/1/24.
 */
import React, {Component, PropTypes} from 'react'
import {Select} from 'antd'

const Option = Select.Option

class EnumSelect extends Component {
    static propTypes = {
        enum: PropTypes.any.isRequired,
        all: PropTypes.string,
        placeholder: PropTypes.string,
        multiple: PropTypes.any
    }//props 类型检查

    static defaultProps = {}//默认 props

    constructor(props) {
        super(props)
        this.state = {}
    }//初始化 state

    render() {
        const Enum = this.props.enum
        let groupOptions = [];
        if (this.props.all) {
            groupOptions.push(<Option value="" key="">{this.props.all}</Option>)
        }
        for (let key in Enum) {
            groupOptions.push(<Option value={Enum instanceof Array ? Enum[key] : key} key={key}>{Enum[key]}</Option>)
        }
        return (
            <Select {...this.props}>
                {groupOptions}
            </Select>
        )
    }//渲染
}

export default EnumSelect