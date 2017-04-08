/**
 * Created by DengYiKun on 2017/3/10.
 */
import React, {Component, PropTypes} from 'react'
import {Spin, Button, Row, Col, Card} from 'antd'
import Dropzone from 'react-dropzone'
import {HTTP} from '../../config'

class ImageList extends Component {
    static propTypes = {
        scene: PropTypes.string.isRequired,
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

    addImage = () => {
        this.refs.dropzone.open()
    }

    downloadImage = (image) => {
        const url = HTTP.apiHost() + image.image_url
        let a = document.createElement("a")
        a.href = url
        a.download = url.substring(url.lastIndexOf('/') + 1)
        a.click()
    }

    removeImage = (image) => {
        let images = this.props.value.images.slice()
        images.splice(images.findIndex((item) => item === image),1)
        let newValue = {...this.props.value}
        newValue.images = images
        this.props.onChange(newValue)
    }

    onDrop = (files) => {
        this.setState({isLoading: true})
        let formData = new FormData()
        formData.append('image', files[0])
        formData.append('name', files[0].name.split('.')[0])
        formData.append('scene', this.props.scene)
        HTTP.fetch('POST', 'image', formData, (data) => {
            let newValue = {...this.props.value}
            newValue.images = this.props.value && this.props.value.images ?
                this.props.value.images.slice() : []
            const image = {
                image_url: data.relative_url,
                image_thumb_url: data.relative_thumb_url,
                caption: data.name
            }
            newValue.images.push(image)
            this.setState({isLoading: false})
            this.props.onChange(newValue)
        })
    }

    render() {
        return (
            <Spin spinning={this.state.isLoading}>
                <Dropzone accept='image/png,image/jpg,image/jpeg' style={{display: 'none'}}
                          multiple={false} ref="dropzone" onDrop={this.onDrop}/>
                {
                    !(this.props.total && this.props.value && this.props.value.images &&
                    this.props.value.images.length >= this.props.total.total) &&
                    <Button icon="plus" onClick={this.addImage}
                            style={{marginBottom: '16px'}}>添加图片</Button>
                }
                <Row gutter={16}>
                    {
                        this.props.value && this.props.value.images &&
                        this.props.value.images.map((image) => {
                            return <Col sm={24} md={6} key={image.image_url}>
                                <Card bodyStyle={{padding: 0}} style={{marginBottom: '16px'}}>
                                    <img style={{width: '100%', height: '150px'}}
                                         src={HTTP.apiHost() + image.image_thumb_url}/>
                                    <Button style={{width: '50%', height: '40px', border: 'none'}}
                                            onClick={() => this.downloadImage(image)}
                                            icon="download">下载</Button>
                                    <Button style={{width: '50%', height: '40px', border: 'none'}}
                                            onClick={() => this.removeImage(image)}
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

export default ImageList