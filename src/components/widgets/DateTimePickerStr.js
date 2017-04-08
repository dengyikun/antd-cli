/**
 * Created by DengYiKun on 2017/2/17.
 */
import React, {Component, PropTypes} from 'react'
import {DatePicker} from 'antd'
import moment from 'moment'

class DateTimePickerStr extends Component {
    static propTypes = {}//props 类型检查

    static defaultProps = {}//默认 props

    constructor(props) {
        super(props)
        this.state = {}
    }//初始化 state

    render() {
        return (
            <DatePicker {...this.props} showTime
                        style={{width: '100%'}}
                        format="YYYY-MM-DD HH:mm:ss"
                        onChange={(date, dateString) => {
                            this.props.onChange(dateString)
                        }}
                        value={
                            this.props.value ?
                                moment(this.props.value) : null
                        }/>
        )
    }//渲染
}

export default DateTimePickerStr