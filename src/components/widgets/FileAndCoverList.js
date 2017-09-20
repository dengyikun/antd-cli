/**
 * Created by DengYiKun on 2017/3/10.
 */
import React, {Component, PropTypes} from 'react'
import {Spin, Button, Row, Col, Card} from 'antd'
import File from './File'
import ImageURL from './ImageGallery'

class FileAndCoverList extends Component {
    static propTypes = {
        total: PropTypes.number
    }//props 类型检查

    static defaultProps = {}//默认 props

    static contextTypes = {}//context 显式注册

    constructor(props) {
        super(props)
        this.state = {
            isLoading: false
        }
    }//初始化 state

    componentWillMount() {
    }//插入 DOM 前

    componentWillReceiveProps(nextProps) {
    }//接收新 props

    addFile = () => {
        let newValue = this.props.value.slice()
        newValue.push({
            image_url: '',
            pdf_url: '',
            image_name: ''
        })
        this.props.onChange(newValue)
    }

    fileChange = (value, index) => {
        let newValue = this.props.value.slice()
        newValue[index].pdf_url = value
        this.props.onChange(newValue)
    }

    imageChange = (image, index) => {
        let newValue = this.props.value.slice()
        newValue[index].image_url = image.relative_url
        newValue[index].image_name = image.image_name
        this.props.onChange(newValue)
    }

    remove = (index) => {
        let newValue = this.props.value.slice()
        newValue.splice(index, 1)
        debugger
        this.props.onChange(newValue)
    }

    render() {
        return (
            <Spin spinning={this.state.isLoading}>
                {
                    !(this.props.total && this.props.value &&
                    this.props.value.length >= this.props.total.total) &&
                    <Button icon="plus" onClick={this.addFile}
                            style={{marginBottom: '16px'}}>添加文件与封面</Button>
                }
                <Row gutter={16}>
                    {
                        this.props.value &&
                        this.props.value.map((item, index) => {
                            return <Col sm={24} md={12} key={index}>
                                <Card bodyStyle={{padding: 0}} style={{marginBottom: '16px'}}>
                                    <Row gutter={20} style={{padding: 20}}>
                                        <Col span={12}>
                                            <File scene={'case'} value={item.pdf_url}
                                                  style={{width: '100%', height: '250px'}}
                                                  onChange={(value) => this.fileChange(value, index)}/>
                                        </Col>
                                        <Col span={12}>
                                            <ImageURL scene={'common'} value={item.image_url}
                                                      style={{width: '100%', height: '250px'}}
                                                      onChange={(value, image) => this.imageChange(image, index)}/>
                                        </Col>
                                    </Row>
                                    <Button style={{width: '100%', height: '40px', border: 'none'}}
                                            onClick={() => this.remove(index)}
                                            icon="delete">删除</Button>
                                </Card>
                            </Col>
                        })
                    }
                </Row>
            </Spin>
        )
    }//渲染

    componentDidMount() {
    }//插入 DOM 后

    shouldComponentUpdate(nextProps, nextState) {
        return true
    }//更新判断

    componentWillUpdate(nextProps, nextState) {
    }//更新前

    componentDidUpdate(prevProps, prevState) {
    }//更新后

    componentWillUnmount() {
    }//卸载前
}

export default FileAndCoverList