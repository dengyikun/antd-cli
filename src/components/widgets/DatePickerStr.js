/**
 * Created by DengYiKun on 2017/2/17.
 */
import React, {Component, PropTypes} from 'react'
import {DatePicker} from 'antd'
import moment from 'moment'

class DatePickerStr extends Component {
    static propTypes = {}//props 类型检查

    static defaultProps = {}//默认 props

    constructor(props) {
        super(props)
        this.state = {}
    }//初始化 state

    render() {
        return (
            <DatePicker {...this.props}
                        onChange={(date, dateString) => {
                            dateString = date ? dateString : null
                            this.props.onChange(dateString)
                        }}
                        value={
                            this.props.value ?
                                moment(this.props.value, 'YYYY-MM-DD') : null
                        }/>
        )
    }//渲染
}

export default DatePickerStr