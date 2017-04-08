/**
 * Created by DengYiKun on 2017/2/25.
 */
import React, {Component, PropTypes} from 'react'
import {Spin, Card, Button} from 'antd'
import Dropzone from 'react-dropzone'
import {HTTP} from '../../config'
import UPLOAD from '../../assets/images/upload.png'
import FILE from '../../assets/images/file.png'

class File extends Component {
    static propTypes = {
        scene: PropTypes.string.isRequired,
    }//props 类型检查

    static defaultProps = {}//默认 props

    constructor(props) {
        super(props)
        this.state = {
            isLoading: false,
            url: '',
            name: ''
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
        if (value && value.lastIndexOf('/') !== -1) {
            this.setState({url: value, name: value.substring(value.lastIndexOf('/') + 1)})
        }else {
            this.setState({url: '', name: ''})
        }
    }

    onDrop = (files) => {
        this.setState({isLoading: true})
        let formData = new FormData()
        formData.append('file', files[0])
        formData.append('name', files[0].name)
        formData.append('scene', this.props.scene)
        HTTP.fetch('POST', 'upload_file', formData, (file) => {
            this.setState({isLoading: false, url: file.relative_url})
            this.props.onChange(file.relative_url)
        })
    }

    download = () => {
        const url = HTTP.apiHost() + this.state.url
        let a = document.createElement("a")
        a.href = url
        a.download = url.substring(url.lastIndexOf('/') + 1)
        a.click()
    }

    render() {
        return (
            <Spin spinning={this.state.isLoading} tip="loading...">
                <Card bodyStyle={{padding: 0}} style={{width: 100, height: 140, ...this.props.style}}>
                    <Dropzone onDrop={this.onDrop} multiple={false}
                              style={{width: '100%', height: 'calc(100% - 40px)'}}
                              accept={'application/pdf'}>
                        <img style={{width: '100%', height: '100%'}}
                             src={this.state.url ? FILE : UPLOAD}/>
                            <div style={{
                                position: 'absolute',
                                bottom: 40,
                                width: '100%',
                                textAlign: 'center',
                                backgroundColor: 'rgba(0,0,0,0.5)',
                                color: 'white',
                                padding: '0 8px',
                            }}>
                                <p style={{
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis',
                                    whiteSpace: 'nowrap',
                                }}>{this.state.name}</p>
                            </div>
                    </Dropzone>
                    {
                        this.state.url &&
                        <Button style={{width: '100%', height: '40px', border: 'none'}}
                                onClick={this.download} icon="download">下载</Button>
                    }
                </Card>
            </Spin>
        )
    }//渲染
}

export default File