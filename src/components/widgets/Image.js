/**
 * Created by DengYiKun on 2017/2/25.
 */
import React, {Component, PropTypes} from 'react'
import {Spin, message} from 'antd'
import Dropzone from 'react-dropzone'
import {HTTP, ENUM} from '../../utils'
import DEFAULT from '../../assets/images/default.png'

class Image extends Component {
    static propTypes = {
        // disableClick: PropTypes.bool
    }//props 类型检查

    static defaultProps = {}//默认 props

    constructor(props) {
        super(props)
        this.state = {
            isLoading: false,
            imageSrc: ''
        }
    }//初始化 state

    componentWillMount() {
        this.init(this.props.value)
    }//插入 DOM 前

    componentWillReceiveProps(nextProps) {
        if (nextProps.value !== this.props.value) {
            this.init(nextProps.value)
        }
    }//接收新 props

    init = (value) => {
        if (/https?:\/\//.test(value)) {
            this.setState({isLoading: true})
            HTTP.get(value, (image) => {
                this.setState({isLoading: false, imageSrc: image.image})
            }, () => {
                this.setState({isLoading: false})
            })
        }
    }

    onDrop = (files) => {
        if (files.length === 0) {
            message.error('请上传小于 1M 的图片！')
        }else {
            this.setState({isLoading: true})
            let formData = new FormData()
            formData.append('image', files[0])
            formData.append('name', files[0].name)
            HTTP.fetch('POST', 'image', formData, (image) => {
                this.setState({isLoading: false, imageSrc: image.image})
                this.props.onChange(image.url)
            }, () => {
                this.setState({isLoading: false})
            })
        }
    }

    render() {
        return (
            <Dropzone style={{width: 200}} {...this.props}
                      onDrop={this.onDrop} multiple={false}
                      accept='image/png,image/jpg,image/jpeg' maxSize={1024*1024}>
                <Spin spinning={this.state.isLoading} tip="loading...">
                    <img src={this.state.imageSrc}
                         style={{width: 200, ...this.props.style}}
                         onError={(e) => {
                             e.target.src = DEFAULT
                         }}/>
                </Spin>
            </Dropzone>
        )
    }//渲染
}

export default Image