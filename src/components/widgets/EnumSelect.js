/**
 * Created by Loki on 2017/1/24.
 */
import React, {Component, PropTypes} from 'react'
import {Select} from 'antd'

const Option = Select.Option

class EnumSelect extends Component {
    static propTypes = {
        ENUM: PropTypes.any.isRequired,
        all: PropTypes.string,
        placeholder: PropTypes.string,
        multiple: PropTypes.bool
    }//props 类型检查

    static defaultProps = {}//默认 props

    constructor(props) {
        super(props)
        this.state = {}
    }//初始化 state

    render() {
        const {all, ENUM} = this.props
        return (
            <Select {...this.props}>
                {
                    all &&
                    <Option value="" key="">{all}</Option>
                }
                {
                    Object.keys(ENUM).map(key => {
                        key = isNaN(key) ? key : parseInt(key)
                        return <Option value={ENUM instanceof Array ? ENUM[key] : key}
                                       key={key}>
                            {ENUM[key]}
                        </Option>
                        })
                }
            </Select>
        )
    }//渲染
}

export default EnumSelect