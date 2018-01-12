/**
 * Created by DengYiKun on 2017/2/14.
 */
import React, {Component, PropTypes} from 'react'
import {Spin, Form, Row, Col, Button, Modal, message} from 'antd'
import {HTTP} from '../../utils'
import CustomFormItems from './CustomFormItems'


class CustomForm extends Component {
    static propTypes = {
        name: PropTypes.string.isRequired,
        formItems: PropTypes.array.isRequired,
        url: PropTypes.string.isRequired,
        footer: PropTypes.object,
        hideBack: PropTypes.bool,
        hideSubmit: PropTypes.bool,
        onSubmit: PropTypes.func,
        submitText: PropTypes.string,
        isLoading: PropTypes.bool,
    }//props 类型检查

    static defaultProps = {}//默认 props

    static contextTypes = {
        router: PropTypes.object
    }

    constructor(props) {
        super(props)
        this.state = {
            url: '',
            isAdd: true,
            data: {},
            isLoading: false
        }
    }//初始化 state

    componentWillMount() {
        const id = this.context.router.route.match.params.id || ''
        const isAdd = !id
        const url = (/https?:\/\//.test(this.props.url) ? this.props.url : HTTP.getUrl(this.props.url))
            + (isAdd ? '' : id + '/')
        if (!isAdd) {
            this.getData(url)
        }
        this.setState({
            url,
            isAdd,
        })
    }//插入 DOM 前

    getData = (url) => {
        this.setState({isLoading: true})
        HTTP.get(url, (data) => {
            this.setState({data, isLoading: false})
        }, () => {
            this.setState({isLoading: false})
        })
    }

    back = () => {
        if (!this.props.hideBack) {
            this.context.router.history.goBack()
        }
    }

    onSubmit = (e) => {
        e.preventDefault()
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
        if (this.state.isAdd) {
            HTTP.post(this.state.url, formData, (data) => {
                message.success(`${this.props.name}添加成功！`)
                this.back()
            }, () => {
                this.setState({isLoading: false})
            })
        } else {
            HTTP.patch(this.state.url, formData, (data) => {
                message.success(`${this.props.name}修改成功！`)
                this.back()
            }, () => {
                this.setState({isLoading: false})
            })
        }
    }

    render() {
        return (
            <Spin spinning={this.props.isLoading || this.state.isLoading}>
                <Form onSubmit={this.onSubmit}>
                    <span>请认真填写</span>
                    <hr/>
                    <h3>基本信息</h3>
                    <CustomFormItems form={this.props.form}
                               formItems={this.props.formItems}
                               data={this.state.data}/>
                    <Row>
                        <Col span={24}>
                            <hr/>
                        </Col>
                        <Col span={12}>
                            {
                                this.props.footer
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

export default Form.create()(CustomForm)