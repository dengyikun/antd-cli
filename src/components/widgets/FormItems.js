/**
 * Created by DengYiKun on 2017/2/14.
 */
import React, {Component, PropTypes} from 'react'
import {Form, Row, Col, Input} from 'antd'
import {THEME, TOOL} from '../../utils'

const Item = Form.Item

class FormItems extends Component {
    static propTypes = {
        form: PropTypes.object.isRequired,
        formItems: PropTypes.array.isRequired
    }//props 类型检查

    static defaultProps = {
        formItems: [{
            label: '',
            key: '',
            object: null,
            isRequired: false,
            rules: [],
            span: 12,//24
            formSpan: {},
            onChange: null,
            value: null,
            valuePropName: 'value',
            trigger: 'onChange',
            validateTrigger: 'onChange',
            items: [],
        }],
        buttons: []
    }//默认 props

    static contextTypes = {
        router: PropTypes.object
    }

    constructor(props) {
        super(props)
        this.state = {
            data: {},
            isLoading: false
        }
    }//初始化 state

    getFormItem = (formItem) => {
        const {getFieldDecorator} = this.props.form
        let span = formItem.span !== undefined ? formItem.span : THEME.formSpan12
        let formSpan = formItem.formSpan || (
                formItem.span === 24 ? THEME.formSpan24Layout : THEME.formSpan12Layout
            )
        let rules = (formItem.rules || []).slice()
        rules.push({
            required: formItem.isRequired, message: '这是必填项！'
        })
        return Array.isArray(formItem.items) ?
            <Col {...span} key={formItem.key}>
                {
                    formItem.items.map((item) => this.getFormItem(item))
                }
            </Col> :
            <Col {...span} key={formItem.key}>
                <Item {...formSpan} label={formItem.label}>
                    {getFieldDecorator(formItem.key, {
                        valuePropName: formItem.valuePropName || 'value',
                        initialValue: formItem.value ?
                            formItem.value(this.props.data) :
                            TOOL.getValue(this.props.data, formItem.key),
                        rules,
                        trigger: formItem.trigger || 'onChange',
                        validateTrigger: formItem.validateTrigger || 'onChange',
                        onChange: (value, data) => {
                            if(formItem.onChange) {
                                formItem.onChange(value, this.props.form, data)
                            }
                        }
                    })(
                        formItem.object || <Input/>
                    )}
                </Item>
            </Col>
    }

    render() {
        return (
            <Row>
                {
                    this.props.formItems.map((formItem) => this.getFormItem(formItem))
                }
            </Row>
        )
    }

//渲染
}

export default FormItems