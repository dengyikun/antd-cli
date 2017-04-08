/**
 * Created by DengYiKun on 2017/2/25.
 */
import React, {Component, PropTypes} from 'react'
import {Spin} from 'antd'
import Dropzone from 'react-dropzone'
import {HTTP, ENUM} from '../../config'
import DEFAULT from '../../assets/images/default.png'

class Image extends Component {
    static propTypes = {
        scene: PropTypes.string.isRequired,
        disableClick: PropTypes.bool
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
            })
        }
    }

    onDrop = (files) => {
        this.setState({isLoading: true})
        let formData = new FormData()
        formData.append('image', files[0])
        formData.append('name', files[0].name)
        formData.append('scene', this.props.scene)
        HTTP.fetch('POST', 'image', formData, (image) => {
            this.setState({isLoading: false, imageSrc: image.image})
            this.props.onChange(image.url)
        })
    }

    render() {
        return (
            <Dropzone style={{width: 200}} {...this.props}
                      onDrop={this.onDrop} multiple={false}
                      accept='image/png,image/jpg,image/jpeg'>
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