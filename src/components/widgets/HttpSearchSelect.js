/**
 * Created by Loki on 2017/1/24.
 */
import React, {Component, PropTypes} from 'react'
import {Select} from 'antd'
import {HTTP, ENUM, PERMITS} from '../../config'

const Option = Select.Option

class HttpSearchSelect extends Component {
    static propTypes = {
        url: PropTypes.string.isRequired,
        screen: PropTypes.object,
        textKey: PropTypes.string,
        valueKey: PropTypes.string,
        placeholder: PropTypes.string,
    }//props 类型检查

    static defaultProps = {
        screen: {},
        textKey: 'name',
        valueKey: 'url'
    }//默认 props

    constructor(props) {
        super(props)
        this.state = {
            data: [],
            value: ''
        }
    }//初始化 state

    componentWillMount() {
        this.init(this.props.value)
    }//插入 DOM 前

    componentWillReceiveProps(nextProps) {
        if (nextProps.value !== this.props.value) {
            this.init(nextProps.value)
        }
    }//接收新 props

    init = (value) => {
        if (value !== this.state.value) {
            if (/https?:\/\//.test(value)) {
                HTTP.get(value, (data) => {
                    this.setState({value: data[this.props.textKey]})
                })
            } else {
                this.setState({value})
            }
        }
    }

    getData = (value) => {
        this.props.onChange(value)
        let screen = {//筛选
            name__contains: value,//名字
            status: 'valid',
            ...this.props.screen
        }
        HTTP.fetch('GET', this.props.url, null, (data) => {
            this.setState({data: data.results})
        }, {...screen})
    }

    onSelect = (value) => {
        const data = this.state.data.find((item) => item.url === value)
        this.props.onChange(value, data)
    }

    render() {
        return (
            <Select placeholder={'请输入名称进行搜索'}
                    {...this.props}
                    onChange={this.getData}
                    onSelect={this.onSelect}
                    value={this.state.value || ''}
                    combobox
                    allowClear
                    showArrow={false}
                    filterOption={false}>
                {
                    this.state.data.map((item) => {
                        return <Option value={item[this.props.valueKey]}
                                       key={item[this.props.valueKey]}>
                            {item[this.props.textKey]}
                        </Option>
                    })
                }
            </Select>
        )
    }//渲染
}

export default HttpSearchSelect