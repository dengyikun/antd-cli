/**
 * Created by DengYiKun on 2017/2/25.
 */
import React, {Component, PropTypes} from 'react'
import {Card} from 'antd'
import Dropzone from 'react-dropzone'
import UPLOAD from '../../assets/images/upload.png'
import FILE from '../../assets/images/file.png'

class ModelUploadFile extends Component {
    static propTypes = {
        scene: PropTypes.string.isRequired,
        accept: PropTypes.string,
    }//props 类型检查

    static defaultProps = {}//默认 props

    constructor(props) {
        super(props)
        this.state = {
            name: ''
        }
    }//初始化 state

    onDrop = (files) => {
        this.setState({name: files[0].name})
        this.props.onChange(files[0])
    }

    render() {
        return (
            <Card bodyStyle={{padding: 0}} style={{width: 100}}>
                <Dropzone onDrop={this.onDrop} multiple={false}
                          style={{width: 100, height: 100}}
                          accept={this.props.accept || ''}>
                    <img style={{width: 100, height: 100}}
                         src={this.state.name ? FILE : UPLOAD}/>
                    {
                        this.state.name &&
                        <div style={{
                            position: 'absolute',
                            bottom: 0,
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
                    }
                </Dropzone>
            </Card>
        )
    }//渲染
}

export default ModelUploadFile