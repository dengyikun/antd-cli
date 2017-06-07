/**
 * Created by DengYiKun on 2017/2/14.
 */
import React, {Component, PropTypes} from 'react'
import {Spin, Form, Row, Col, Button, Modal, message} from 'antd'
import {HTTP} from '../../config'
import FormItems from './FormItems'


class PanelForm extends Component {
    static propTypes = {
        name: PropTypes.string.isRequired,
        formItems: PropTypes.array.isRequired,
        url: PropTypes.string.isRequired,
        isAdd: PropTypes.bool.isRequired,
        invalid: PropTypes.object,
        valid: PropTypes.object,
        buttons: PropTypes.array,
        hideBack: PropTypes.bool,
        hideSubmit: PropTypes.bool,
        onSubmit: PropTypes.func,
        submitText: PropTypes.string,
        isLoading: PropTypes.bool,
        refresh: PropTypes.object,
    }//props 类型检查

    static defaultProps = {}//默认 props

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

    componentWillMount() {
        if (!this.props.isAdd) {
            this.getData()
        }
    }//插入 DOM 前


    componentWillReceiveProps(nextProps) {
        if (nextProps.refresh !== this.props.refresh) {
            this.getData()
        }
    }//接收新 props

    getData = () => {
        if (/https?:\/\//.test(this.props.url)) {
            this.setState({isLoading: true})
            HTTP.get(this.props.url, (data) => {
                this.setState({data, isLoading: false})
            }, () => {
                this.setState({isLoading: false})
            })
        } else {
            this.back()
        }
    }

    back = () => {
        if (!this.props.hideBack) {
            this.context.router.goBack()
        }
    }

    onSubmit = () => {
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                let formData = this.props.form.getFieldsValue()
                if (this.props.onSubmit) {
                    this.props.onSubmit(formData, this.saveData)
                } else {
                    this.saveData(formData)
                }
            }
        })
    }

    saveData = (formData) => {
        this.setState({isLoading: true})
        if (this.props.isAdd) {
            HTTP.post(this.props.url, formData, (data) => {
                message.success(`${this.props.name}添加成功！`)
                this.back()
            }, () => {
                this.setState({isLoading: false})
            })
        } else {
            HTTP.patch(this.props.url, formData, (data) => {
                message.success(`${this.props.name}修改成功！`)
                this.back()
            }, () => {
                this.setState({isLoading: false})
            })
        }
    }

    invalidData = () => {
        Modal.confirm({
            title: `确认失效该${this.props.name}？`,
            onOk: () => {
                return new Promise((resolve, reject) => {
                    HTTP.patch(this.props.url, this.props.invalid, () => {
                        message.success(`${this.props.name}失效成功！`)
                        resolve()
                    })
                }).catch(() => console.log('Oops errors!'));
            }
        })
    }

    validData = () => {
        Modal.confirm({
            title: `确认生效该${this.props.name}？`,
            onOk: () => {
                return new Promise((resolve, reject) => {
                    HTTP.patch(this.props.url, this.props.valid, () => {
                        message.success(`${this.props.name}生效成功！`)
                        resolve()
                    })
                }).catch(() => console.log('Oops errors!'));
            }
        })
    }

    render() {
        return (
            <Spin spinning={this.props.isLoading || this.state.isLoading}>
                <Form key={this.props.refresh}>
                    <span>请认真填写</span>
                    <hr/>
                    <h3>基本信息</h3>
                    <FormItems form={this.props.form}
                               formItems={this.props.formItems}
                               data={this.state.data}/>
                    <Row>
                        <Col span={24}>
                            <hr/>
                        </Col>
                        <Col span={12}>
                            {
                                this.props.invalid &&
                                <Button type="danger" onClick={this.invalidData}
                                        size="large" style={{marginRight: 20}}>失效</Button>
                            }
                            {
                                this.props.valid &&
                                <Button type="primary" onClick={this.validData}
                                        size="large" style={{marginRight: 20}}>生效</Button>
                            }
                            {
                                this.props.buttons && this.props.buttons.map((button) => button)
                            }
                        </Col>
                        <Col span={12}>
                            {
                                !this.props.hideBack &&
                                <Button size="large" style={{float: 'right', marginLeft: 20}}
                                        onClick={this.back}>返回</Button>
                            }
                            {
                                !this.props.hideSubmit &&
                                <Button type="primary" onClick={this.onSubmit} size="large"
                                        style={{float: 'right'}}>{this.props.submitText || '保存'}</Button>
                            }
                        </Col>
                    </Row>
                </Form>
            </Spin>
        )
    }//渲染
}

export default Form.create()(PanelForm)