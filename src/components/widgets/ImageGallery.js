/**
 * Created by DengYiKun on 2017/2/25.
 */
import React, {Component, PropTypes} from 'react'
import {Spin} from 'antd'
import Gallery from './Gallery'
import {HTTP} from '../../config'
import DEFAULT from '../../assets/images/default.png'

class ImageURL extends Component {
    static propTypes = {}//props 类型检查

    static defaultProps = {}//默认 props

    constructor(props) {
        super(props)
        this.state = {
            isLoading: false,
            isVisible: false,
            file: '',
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
                this.setState({isLoading: false, file: image.file})
            })
        }
    }

    onOk = (image) => {
        this.setState({isVisible: false})
        this.props.onChange(image.url)
    }

    render() {
        return (
            <Spin spinning={this.state.isLoading}>
                <img src={this.state.file}
                     style={{height: 140, width: 'auto', ...this.props.style}}
                     onError={(e) => {
                         e.target.src = DEFAULT
                     }}
                     onClick={() => this.setState({isVisible: true})}/>
                <Gallery visible={this.state.isVisible}
                         onCancel={() => this.setState({isVisible: false})}
                         onOk={this.onOk}/>
            </Spin>
        )
    }//渲染
}

export default ImageURL