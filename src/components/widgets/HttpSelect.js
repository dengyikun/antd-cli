/**
 * Created by Loki on 2017/1/24.
 */
import React, {Component, PropTypes} from 'react'
import {Select} from 'antd'
import {HTTP} from '../../config'

const Option = Select.Option

class HttpSelect extends Component {
    static propTypes = {
        url: PropTypes.string.isRequired,
        screen: PropTypes.object,
        textKey: PropTypes.string,
        valueKey: PropTypes.string,
        all: PropTypes.string,
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
            isInit: false
        }
    }//初始化 state

    componentWillMount() {
        this.init()
    }//插入 DOM 前

    init = () => {
        let screen = {//筛选
            status: 'valid',
            ...this.props.screen
        }
        HTTP.fetch('GET', this.props.url, null, (data) => {
            if (this.props.all) {
                data.results.splice(0, 0, 'all')
            }
            this.setState({data: data.results, isInit: true})
        }, {...screen})
    }

    render() {
        return (
            <Select {...this.props}
                    value={this.state.isInit ? this.props.value : ''}>
                {
                    this.state.data.map((item) => {
                        return item === 'all' ?
                            <Option value="" key="all">
                                {this.props.all}
                            </Option> :
                            <Option value={item[this.props.valueKey]}
                                    key={item[this.props.valueKey]}>
                                {item[this.props.textKey]}
                            </Option>
                    })
                }
            </Select>
        )
    }//渲染
}

export default HttpSelect