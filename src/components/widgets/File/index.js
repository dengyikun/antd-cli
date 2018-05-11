import React, {Component, PropTypes} from 'react'
import {Spin, Card, Icon} from 'antd'
import DropZone from 'react-dropzone'
import {HTTP} from '../../../utils'
import FileThumbnail from '../FileThumbnail'
import styles from './index.scss'

class File extends Component {
  static propTypes = {
    disabled: PropTypes.bool,
    accept: PropTypes.string,
  }//props 类型检查

  static defaultProps = {}//默认 props

  constructor(props) {
    super(props)
    this.state = {
      isLoading: false
    }
  }//初始化 state

  upload = () => {
    this.refs.dropzone.open()
  }

  onDrop = (files) => {
    this.setState({isLoading: true})
    let formData = new FormData()
    formData.append('file', files[0])
    HTTP.post('files', formData, (data) => {
      this.props.onChange(data)
      this.setState({isLoading: false})
    }, () => {
      this.setState({isLoading: false})
    })
  }

  download = () => {
    const url = this.props.value.file
    let a = document.createElement("a")
    a.href = url
    a.download = this.props.value.name
    a.click()
  }

  delete = () => {
    this.props.onChange()
  }

  render() {
    const {style, value, accept, disabled} = this.props
    const {file, name} = value || {}

    return (
      <Spin spinning={this.state.isLoading} wrapperClassName={styles.body}>
        <DropZone className={styles.dropZone} multiple={false} ref="dropzone"
                  accept={accept} disableClick={disabled}  onDrop={this.onDrop}/>
        <Card bodyStyle={{padding: 0}} style={style} className={styles.file}>
          <FileThumbnail src={file} name={name}/>
          {
            !disabled &&
            <div className={styles.cover}>
              {
                value &&
                <div className={styles.download}
                     onClick={this.download}>
                  <Icon type="download"/> 下载
                </div>
              }
              {
                value &&
                <div className={styles.delete}
                     onClick={this.delete}>
                  <Icon type="delete"/> 删除
                </div>
              }
              <div className={styles.upload}
                   onClick={this.upload}>
                <Icon type="upload"/> 上传
              </div>
            </div>
          }
        </Card>
      </Spin>
    )
  }//渲染
}

export default File