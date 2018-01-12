/**
 * Created by DengYiKun on 2017/2/14.
 */
import React, {Component, PropTypes} from 'react'
import {Form, Row, Col, Input} from 'antd'
import {THEME, TOOL} from '../../utils'

const FormItem = Form.Item

/**
 * 封装 antd Form.Item
 */
class CustomFormItem extends Component {
    static propTypes = {
        data: PropTypes.object,
        form: PropTypes.object.isRequired, //来自经过 Form.create 包装过的父组件
        render: PropTypes.func,//自定义渲染方法，渲染返回值，传入 form 作为参数
        label: PropTypes.any,//label 标签的文本，同 Form.Item label
        help: PropTypes.any,//控件下的提示信息，同 Form.Item help
        key: PropTypes.string.isRequired,//Form.Item id 以及组件的 key
        object: PropTypes.object,//将被 getFieldDecorator 包装的控件
        required: PropTypes.bool,//是否必填
        span: PropTypes.number,//24 组件整体布局
        formSpan: PropTypes.object,//标签及控件的布局
        onChange: PropTypes.func,//控件改变时的回调，传入 value, form, data(表单当前数据) 作为参数
        initialValue: PropTypes.func,//设置控件初始值的方法，传入 data(表单当前数据) 作为参数
        rules: PropTypes.array,//校验规则，同 options.rules
        trigger: PropTypes.string,//收集子节点的值的时机，同 options.trigger
        validateTrigger: PropTypes.string,//校验子节点值的时机，同 options.validateTrigger
        valuePropName: PropTypes.string,//控件值的属性，同 options.valuePropName
    }//props 类型检查

    static defaultProps = {
        data: {},
        object: <Input/>,
        required: false,
        span: THEME.formSpan12,
        rules: [],
        trigger: 'onChange',
        validateTrigger: 'onChange',
        valuePropName: 'value',
    }//默认 props

    render() {
        const {
            data, form, render, label, help, key, object, required, span, formSpan,
            onChange, initialValue, rules, trigger, validateTrigger, valuePropName
        } = this.props
        const {getFieldDecorator} = form
        const itemSpan = formSpan || (
                span === 24 ? THEME.formSpan24Layout : THEME.formSpan12Layout
            )
        return render ? render(form) :
            <Col {...span} key={key}>
                <FormItem {...itemSpan} label={label} help={help}>
                    {getFieldDecorator(key, {
                        valuePropName,
                        initialValue: initialValue ?
                            initialValue(data) :
                            TOOL.getValue(data, key),
                        rules: [...rules, {
                            required: required, message: '这是必填项！'
                        }],
                        trigger,
                        validateTrigger,
                        onChange: (value, data) => {
                            if (onChange) {
                                onChange(value, form, data)
                            }
                        }
                    })(object)}
                </FormItem>
            </Col>
    }

}

class CustomFormItems extends Component {
    static propTypes = {
        form: PropTypes.object.isRequired, //来自经过 Form.create 包装过的父组件
        formItems: PropTypes.array.isRequired,
    }//props 类型检查

    static defaultProps = {
        formItems: []
    }//默认 props

    constructor(props) {
        super(props)
        this.state = {}
    }//初始化 state

    render() {
        return (
            <Row>
                {
                    this.props.formItems.map((formItem) => formItem &&
                    <CustomFormItem key={formItem.key} form={this.props.form} {...formItem}/>)
                }
            </Row>
        )
    }//渲染

}

export default CustomFormItems