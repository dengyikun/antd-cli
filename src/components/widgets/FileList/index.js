/**
 * Created by DengYiKun on 2017/3/10.
 */
import React, {Component, PropTypes} from 'react'
import {Spin, Button, Card, Icon} from 'antd'
import DropZone from 'react-dropzone'
import {HTTP} from '../../../config'
import FileThumbnail from '../FileThumbnail'
import styles from './index.scss'

class FileList extends Component {
  static propTypes = {
    accept: PropTypes.string,
  }//props 类型检查

  static defaultProps = {}//默认 props

  static contextTypes = {}//context 显式注册

  constructor(props) {
    super(props)
    this.state = {
      isLoading: false,
      total: 0,
      error: {}
    }
  }//初始化 state

  componentWillMount() {
  }//插入 DOM 前

  componentWillReceiveProps(nextProps) {
  }//接收新 props

  add = () => {
    this.refs.dropzone.open()
  }

  download = (url) => () => {
    let a = document.createElement("a")
    a.href = url
    a.download = url.substring(url.lastIndexOf('/') + 1)
    a.click()
  }

  delete = (index) => () => {
    let value = this.props.value.slice()
    value.splice(index, 1)
    this.props.onChange(value)
  }

  onDrop = (files) => {
    this.setState({isLoading: true})
    let formData = new FormData()
    formData.append('file', files[0])
    HTTP.post('files', formData, (data) => {
      let value = this.props.value.slice()
      value.push(data)
      this.props.onChange(value)
      this.setState({isLoading: false})
    }, () => {
      this.setState({isLoading: false})
    })
  }

  render() {
    const {isLoading} = this.state
    const {value, accept} = this.props
    return (
      <Spin spinning={isLoading} wrapperClassName={styles.body}>
        <DropZone className={styles.dropZone} multiple={false} ref="dropzone"
                  accept={accept} onDrop={this.onDrop}/>
          {
            value && value.map((file, index) =>
              <Card className={styles.file} key={file.file}>
                <FileThumbnail src={file.file} name={file.name}/>
                <div className={styles.cover}>
                  <div className={styles.download}
                          onClick={this.download(file.file)}>
                    <Icon type="download"/> 下载
                  </div>
                  <div className={styles.delete}
                          onClick={this.delete(index)}>
                    <Icon type="delete"/> 删除
                  </div>
                </div>
              </Card>
            )
          }
          <Card className={styles.add} onClick={this.add}>
            <Icon className={styles.icon} type="plus"/>
          </Card>
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

export default FileList