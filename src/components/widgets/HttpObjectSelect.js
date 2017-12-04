/**
 * Created by Loki on 2017/1/24.
 */
import React, {Component, PropTypes} from 'react'
import {Select} from 'antd'
import {HTTP} from '../../utils'

const Option = Select.Option

class HttpObjectSelect extends Component {
    static propTypes = {
        url: PropTypes.string.isRequired,
        screen: PropTypes.object,
        textKey: PropTypes.string,
        valueKey: PropTypes.string,
        all: PropTypes.string,
        mode: PropTypes.string,
    }//props 类型检查

    static defaultProps = {
        screen: {},
        textKey: 'name',
        valueKey: 'url',
    }//默认 props

    constructor(props) {
        super(props)
        this.state = {
            value: null,
            data: [],
            isInit: false,
        }
    }//初始化 state

    componentWillMount() {
        if (this.props.mode === 'multiple') {
            let value = this.props.value ?
                Array.from(this.props.value, item => item[this.props.valueKey]) : []
            this.setState({value})
        } else {
            this.setState({value: this.props.value})
        }
        this.init()
    }//插入 DOM 前

    componentWillReceiveProps(nextProps) {
        if (nextProps.value && nextProps.value !== this.props.value) {
            if (this.props.mode === 'multiple') {
                let value = nextProps.value ?
                    Array.from(nextProps.value, item => item[this.props.valueKey]) : []
                this.setState({value})
            } else {
                this.setState({value: nextProps.value})
            }
        }
    }//接收新 props

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.screen !== this.props.screen) {
            this.init()
        }
    }//更新后

    init = () => {
        let screen = {//筛选
            status: 'valid',
            page_size: 1000,
            ...this.props.screen
        }
        HTTP.fetch('GET', this.props.url, null, (data) => {
            this.setState({data: data.results, isInit: true})
        }, {...screen})
    }

    onChange = (values) => {
        this.setState({value: values})
        this.props.onChange(
            Array.from(values, value => this.state.data.find(item => item[this.props.valueKey] === value))
        )
    }

    getOptions = () => {
        let options = []
        if (this.props.all) {
            options.push(
                <Option key="all">
                    {this.props.all}
                </Option>
            )
        }
        this.state.data.map(item =>
            options.push(
                <Option key={item[this.props.valueKey]}>
                    {item[this.props.textKey]}
                </Option>
            )
        )

        return options
    }

    filterOption = (inputValue, option) => option.props.children.includes(inputValue)

    render() {
        return (
            <Select {...this.props}
                    value={this.state.isInit ? this.state.value : []}
                    onChange={this.onChange}
                    filterOption={this.props.filterOption ? this.filterOption : false}>
                {
                    this.getOptions()
                }
            </Select>
        )
    }//渲染
}

export default HttpObjectSelect