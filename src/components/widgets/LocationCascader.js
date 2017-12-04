/**
 * Created by Loki on 2017/1/24.
 */
import React, {Component, PropTypes} from 'react'
import {Cascader} from 'antd'
import {ENUM} from '../../utils'

class LocationCascader extends Component {
    static propTypes = {
        noArea: PropTypes.any
    }//props 类型检查

    static defaultProps = {}//默认 props

    constructor(props) {
        super(props)
        this.state = {}
    }//初始化 state

    onChange = (value) => {
        let newValue = {}
        newValue.province = value[0] || ''
        newValue.city = value[1] || ''
        newValue.area = value[2] || ''
        this.props.onChange(newValue)
    }

    render() {
        let value = []
        if (this.props.value && this.props.value.province) {
            value.push(this.props.value.province || '')
            value.push(this.props.value.city || '')
            value.push(this.props.value.area || '')
        }
        return (
            <Cascader placeholder="请选择地址"
                      changeOnSelect showSearch {...this.props}
                      value={value} onChange={this.onChange}
                      options={this.props.noArea ? ENUM.city : ENUM.area}/>
        )
    }//渲染
}

export default LocationCascader