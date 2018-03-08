/**
 * Created by DengYiKun on 2017/2/17.
 */
import React, {Component, PropTypes} from 'react'
import {DatePicker} from 'antd'
import moment from 'moment'
import locale from 'antd/lib/date-picker/locale/zh_CN'

const RangePicker = DatePicker.RangePicker

class RangePickerStr extends Component {
    static propTypes = {}//props 类型检查

    static defaultProps = {}//默认 props

    constructor(props) {
        super(props)
        this.state = {}
    }//初始化 state

    componentWillMount() {
    }//插入 DOM 前

    componentWillReceiveProps(nextProps) {
    }//接收新 props

    render() {
        return (
            <RangePicker
                {...this.props}
                onChange={(date, dateString) => {
                    this.props.onChange(dateString)
                }}
                value={Array.from(this.props.value || [], (item) => moment(item, this.props.format || 'YYYY-MM-DD'))}
                locale={locale}/>
        )
    }//渲染
}

export default RangePickerStr