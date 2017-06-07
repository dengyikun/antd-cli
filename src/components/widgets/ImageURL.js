/**
 * Created by DengYiKun on 2017/2/25.
 */
import React, {Component, PropTypes} from 'react'
import {Spin, message} from 'antd'
import Dropzone from 'react-dropzone'
import {HTTP, ENUM} from '../../config'
import DEFAULT from '../../assets/images/default.png'

class ImageURL extends Component {
    static propTypes = {
        scene: PropTypes.string.isRequired,
        disableClick: PropTypes.bool
    }//props 类型检查

    static defaultProps = {}//默认 props

    constructor(props) {
        super(props)
        this.state = {
            isLoading: false
        }
    }//初始化 state

    onDrop = (files) => {
        if (files.length === 0) {
            message.error('请上传小于 1M 的图片！')
        }else {
            this.setState({isLoading: true})
            let formData = new FormData()
            formData.append('image', files[0])
            formData.append('name', files[0].name)
            formData.append('scene', this.props.scene)
            HTTP.fetch('POST', 'image', formData, (image) => {
                this.setState({isLoading: false})
                this.props.onChange(image.relative_url, image)
            })
        }
    }

    render() {
        return (
            <Dropzone style={{width: 200}} {...this.props}
                      onDrop={this.onDrop} multiple={false}
                      accept='image/png,image/jpg,image/jpeg' maxSize={1024*1024}>
                <Spin spinning={this.state.isLoading} tip="loading...">
                    <img src={HTTP.apiHost() + this.props.value}
                         style={{width: 200, ...this.props.style}}
                         onError={(e) => {
                             e.target.src = DEFAULT
                         }}/>
                </Spin>
            </Dropzone>
        )
    }//渲染
}

export default ImageURL