/**
 * Created by DengYiKun on 2017/3/8.
 */
import React, {Component, PropTypes} from 'react'
import {Icon, Modal, Spin, Input, Button, Row, Col, message} from 'antd'
import Dropzone from 'react-dropzone'
import ReactScrollbar from 'react-custom-scrollbars'
import {HTTP} from '../../utils'

const Search = Input.Search

class Gallery extends Component {
    static propTypes = {
        visible: PropTypes.bool.isRequired,
        onOk: PropTypes.func.isRequired,
        onCancel: PropTypes.func.isRequired,
        multiple: PropTypes.bool,
    }//props 类型检查

    static defaultProps = {}//默认 props

    static contextTypes = {}//context 显式注册

    constructor(props) {
        super(props)
        this.state = {
            images: [],
            selectImages: [],
            isLoading: false,
            isPreviewImageShow: false,
            previewImage: {},
            page: 1,
            next: null,
        }
    }//初始化 state

    componentWillMount() {
        this.getData(this.state.page)
    }//插入 DOM 前

    componentWillReceiveProps(nextProps) {
    }//接收新 props

    getData = (page) => {
        page = page || this.state.page
        this.setState({isLoading: true})
        HTTP.fetch('GET', 'image', null, (data) => {
            this.setState({
                images: this.state.images.concat(data.results),
                isLoading: false,
                next: data.next,
            })
        }, {thumbnail: true, page})
    }

    timer = null

    onScrollFrame = (value) => {
        if (value.top > 0.9 && this.state.next) {
            if (!this.state.isLoading) {
                this.setState({isLoading: true})
                if (this.timer) {
                    clearTimeout(this.timer)
                }
                this.timer = setTimeout(() => {
                    const page = this.state.page + 1
                    this.setState({page})
                    this.getData(page)
                })
            }
        }
    }

    onDrop = (files) => {
        this.setState({isLoading: true})
        let formData = new FormData()
        files.map((file) => {
            formData.append('file', file)
        })
        HTTP.fetch('POST', 'image', formData, (data) => {
            let {images} = this.state
            images.splice(0, 0, data)
            this.setState({images, isLoading: false})
        }, {thumbnail: true})
    }

    selectImage = (image) => {
        let {selectImages} = this.state
        if (selectImages.includes(image)) {
            selectImages.splice(selectImages.findIndex(item => item === image), 1)
            image = {}
        } else if (this.props.multiple) {
            selectImages.push(image)
        } else {
            selectImages = [image]
        }
        this.setState({selectImages, previewImage: image, isPreviewImageShow: false})
    }

    deleteImages = () => {
        let {previewImage, images} = this.state
        if (previewImage.url) {
            this.setState({isLoading: true})
            HTTP.delete(previewImage.url, () => {
                images.splice(images.findIndex(item => item === previewImage), 1)
                this.setState({images, isLoading: false, previewImage: {}})
            })
        }
    }

    onOk = () => {
        if (this.state.selectImages[0]) {
            if (this.props.multiple) {
                this.props.onOk(this.state.selectImages)
            } else {
                this.props.onOk(this.state.selectImages[0])
            }
            this.props.onCancel()
        } else {
            message.error('请选择一张图片')
        }
    }

    render() {
        return (
            <Modal title="图片库" maskClosable={false} {...this.props} width={1000} footer={null}>
                <Spin spinning={this.state.isLoading}>
                    <Dropzone onDrop={this.onDrop} accept='image/*'
                              style={{
                                  width: '100%', height: 100, textAlign: 'center',
                                  marginBottom: '5px', backgroundColor: '#eee', cursor: 'pointer'
                              }}>
                        <Icon type="plus" style={{fontSize: '40px', margin: '15px 0 5px 0'}}/>
                        <p style={{fontSize: '14px'}}>点击或将文件拖到此处</p>
                    </Dropzone>
                    <Row gutter={10}>
                        <Col sm={12} xs={24}>
                            <Search style={{marginBottom: '5px'}}
                                    placeholder="输入图片名搜索"
                                    onSearch={value => console.log(value)}/>
                            <ReactScrollbar style={{height: 440}}
                                            onScrollFrame={this.onScrollFrame}>
                                <div style={{overflow: 'hidden'}}>
                                    <Row gutter={10}>
                                        {
                                            this.state.images.map((image) =>
                                                <Col span={8}
                                                     key={image.url}
                                                     style={{
                                                         height: 140,
                                                         textAlign: 'center',
                                                         cursor: 'pointer'
                                                     }}
                                                     onClick={() => this.selectImage(image)}>
                                                    <img src={image.thumbnail}
                                                         style={{
                                                             width: 'auto', height: 'auto',
                                                             maxWidth: '100%', maxHeight: 120,
                                                             backgroundColor: '#eee',
                                                             margin: '0 auto',
                                                         }}
                                                         onLoad={({target}) =>
                                                             target.style.marginTop =
                                                                 (120 - target.height) / 2 + 'px'}/>
                                                    <div style={{
                                                        overflow: 'hidden',
                                                        textOverflow: 'ellipsis',
                                                        whiteSpace: 'nowrap',
                                                        position: 'absolute',
                                                        width: 'calc(100% - 10px)',
                                                        bottom: 2,
                                                    }}>
                                                        {image.label}
                                                    </div>
                                                </Col>
                                            )
                                        }
                                    </Row>
                                </div>
                            </ReactScrollbar>
                        </Col>
                        <Col sm={12} xs={24} style={{height: 473, textAlign: 'center'}}>
                            <div style={{fontSize: '18px', lineHeight: '30px'}}>
                                预览
                            </div>
                            <img src={this.state.previewImage.file}
                                 style={{
                                     width: 'auto', height: 'auto',
                                     maxWidth: '100%', maxHeight: 400,
                                     margin: '0 auto',
                                     visibility: this.state.isPreviewImageShow ? 'visible' : 'hidden'
                                 }}
                                 onLoad={({target}) => {
                                     target.style.marginTop = (400 - target.height) / 2 + 'px'
                                     this.setState({isPreviewImageShow: true})
                                 }}/>
                            <Row style={{position: 'absolute', width: '100%', bottom: 0}}>
                                <Button type="primary"
                                        onClick={this.onOk}
                                        style={{float: 'right', marginRight: 10}}>确认</Button>
                                <Button onClick={this.props.onCancel}
                                        style={{float: 'right', marginRight: 10}}>取消</Button>
                                <Button type="danger"
                                        onClick={this.deleteImages}
                                        style={{float: 'right', marginRight: 10}}>删除</Button>
                            </Row>
                        </Col>
                    </Row>
                </Spin>
            </Modal>
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

export default Gallery