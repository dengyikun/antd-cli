/**
 * Created by DengYiKun on 2017/2/14.
 */
import React, {Component, PropTypes} from 'react'
import {Modal, Spin, Form, Row, Col, Button, message} from 'antd'
import {HTTP, THEME} from '../../config'
import FormItems from './FormItems'


class ModelForm extends Component {
    static propTypes = {
        name: PropTypes.string.isRequired,
        formItems: PropTypes.array.isRequired,
        url: PropTypes.string.isRequired,
        isAdd: PropTypes.bool.isRequired,
        visible: PropTypes.bool.isRequired,
        onCancel: PropTypes.func.isRequired,
        width: PropTypes.number
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
        this.init(this.props.url)
    }//插入 DOM 前

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.url !== this.props.url || prevProps.visible !== this.props.visible) {
            this.init(this.props.url)
        }
    }//更新后

    init = (url) => {
        if (this.props.isAdd) {
            this.setState({isLoading: false})
        } else {
            if (/https?:\/\//.test(url)) {
                this.setState({isLoading: true})
                HTTP.get(url, (data) => {
                    this.setState({data, isLoading: false})
                }, () => {
                    this.setState({isLoading: false})
                })
            } else {
                this.props.onCancel()
            }
        }
    }


    onClose = () => {
        this.props.form.resetFields()
        this.setState({data: {}})
    }

    onOk = () => {
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                let formData = this.props.form.getFieldsValue()
                this.setState({isLoading: true})
                if (this.props.isAdd) {
                    HTTP.post(this.props.url, formData, (data) => {
                        message.success(`${this.props.name}添加成功！`)
                        this.props.onCancel()
                    }, () => {
                        this.setState({isLoading: false})
                    })
                } else {
                    HTTP.patch(this.props.url, formData, (data) => {
                        message.success(`${this.props.name}修改成功！`)
                        this.props.onCancel()
                    }, () => {
                        this.setState({isLoading: false})
                    })
                }
            }
        })
    }

    render() {
        return (
            <Modal
                visible={this.props.visible}
                title={this.props.isAdd ? `添加${this.props.name}` : `编辑${this.props.name}`}
                onCancel={this.props.onCancel}
                onOk={this.onOk}
                width={this.props.width || 500}
                afterClose={this.onClose}>
                <Spin spinning={this.state.isLoading}>
                    <Form>
                        <FormItems form={this.props.form}
                                   formItems={this.props.formItems}
                                   data={this.state.data}/>
                    </Form>
                </Spin>
            </Modal>
        )
    }//渲染
}

export default Form.create()(ModelForm)