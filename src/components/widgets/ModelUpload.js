/**
 * Created by DengYiKun on 2017/2/14.
 */
import React, {Component, PropTypes} from 'react'
import {Modal, Spin, Form, message, Table} from 'antd'
import File from './ModelUploadFile'
import {HTTP, THEME} from '../../utils'
import FormItems from './FormItems'


class ModelUpload extends Component {
    static propTypes = {
        name: PropTypes.string.isRequired,
        formItems: PropTypes.array.isRequired,
        url: PropTypes.string.isRequired,
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

    onClose = () => {
        this.props.form.resetFields()
        this.setState({data: {}})
    }

    onOk = () => {
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                this.setState({isLoading: true})
                let formData = new FormData()
                for (let key in this.state.data) {
                    formData.append(key, this.state.data[key]);
                }
                HTTP.post(this.props.url, formData, () => {
                    message.success(`${this.props.name}上传成功！`)
                    this.props.onCancel()
                }, (data) => {
                    debugger
                    this.setState({isLoading: false})
                    const columns = [{
                        title: '序号',
                        dataIndex: 'index',
                        render: (text, record, index) => index + 1
                    }, {
                        title: '出错位置',
                        dataIndex: 'key',
                        key: 'key',
                    }, {
                        title: '出错原因',
                        dataIndex: 'msgs',
                        key: 'msgs',
                    }]
                    Modal.error({
                        title: data.message,
                        content: <Table dataSource={data.error} columns={columns}/>,
                        width: '80%'
                    })
                })
            }
        })
    }

    render() {
        let formItems = []
        this.props.formItems.map((item) => {
            formItems.push({
                ...item,
                object: <File scene={'counsel'} accept={item.accept}/>,
                value: (data) => '',
                onChange: (file) => {
                    let newData = {...this.state.data}
                    newData[item.key] = file
                    this.setState({data: newData})
                }
            },)
        })
        return (
            <Modal
                visible={this.props.visible}
                title={'上传' + this.props.name}
                onCancel={this.props.onCancel}
                onOk={this.onOk}
                width={this.props.width || 500}
                afterClose={this.onClose}>
                <Spin spinning={this.state.isLoading}>
                    <Form>
                        <FormItems form={this.props.form}
                                   formItems={formItems}
                                   data={this.state.data}/>
                    </Form>
                </Spin>
            </Modal>
        )
    }//渲染
}

export default Form.create()(ModelUpload)