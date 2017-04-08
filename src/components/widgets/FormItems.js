/**
 * Created by DengYiKun on 2017/2/14.
 */
import React, {Component, PropTypes} from 'react'
import {Form, Row, Col, Input} from 'antd'
import {THEME} from '../../config'

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
            onChange: null,
            value: null,
            valuePropName: 'value'
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

    render() {
        const {getFieldDecorator} = this.props.form
        return (
            <Row>
                {
                    this.props.formItems.map((formItem) => {
                        let rules = (formItem.rules ? formItem.rules : []).slice()
                        rules.push({
                            required: formItem.isRequired, message: '这是必填项！'
                        })
                        let span = THEME.formSpan12
                        if(formItem.span === 24) {
                            span = {span: 24}
                        }else if (formItem.span === 0) {
                            span = {span: 0}
                        }
                        return <Col {...span} key={formItem.key}>
                            <Item {...(formItem.span === 24 ?
                                THEME.formSpan24Layout :
                                THEME.formSpan12Layout)}
                                  label={formItem.label}>
                                {getFieldDecorator(formItem.key, {
                                    valuePropName: formItem.valuePropName || 'value',
                                    initialValue: formItem.value ?
                                        formItem.value(this.props.data) :
                                        this.props.data[formItem.key],
                                    rules,
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
                    })
                }
            </Row>
        )
    }

//渲染
}

export default FormItems