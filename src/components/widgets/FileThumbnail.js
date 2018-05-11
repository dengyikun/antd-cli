import React, {Component, PropTypes} from 'react'
import image from '../../assets/images/default.png'
import icon_file from '../../assets/images/icon_file.svg'

class FileThumbnail extends Component {
  static propTypes = {
    src: PropTypes.string,
    name: PropTypes.string,
  }//props 类型检查

  static defaultProps = {}//默认 props

  static contextTypes = {}//context 显式注册

  constructor(props) {
    super(props)
    this.state = {
      isError: false
    }
  }//初始化 state

  componentWillMount() {
  }//插入 DOM 前

  componentWillReceiveProps(nextProps) {
  }//接收新 props

  render() {
    const {src, name} = this.props
    return (
      <div style={{
        width: '100%', height: '100%', borderBottom: '1px solid #e9e9e9',
        display: 'flex', justifyContent: 'center', alignItems: 'center',
      }}>
        {
          this.state.error && src &&
          <div style={{
            width: '150px', height: '150px', borderBottom: '1px solid #e9e9e9',
            background: `url(${icon_file})`, padding: '70px 50px 0 20px',
            fontSize: '30px', color: '#ffffff', fontWeight: 'bolder', textAlign: 'center',
          }}>
            {
              src.split('.').pop().slice(0, 4).toUpperCase()
            }
          </div>
        }
        {
          name &&
          <div style={{
            width: '100%', position: 'absolute', textAlign: 'center', bottom: 0,
            background: 'rgba(0,0,0,0.4)', color: '#ffffff', fontSize: '16px',
            padding: '0 10px', overflow: 'hidden', textOverflow: 'ellipsis',
            whiteSpace: 'nowrap'
          }}>{name}</div>
        }
        {
          !this.state.error && src &&
          <img style={{
            maxWidth: '100%', maxHeight: '100%', display: 'block', flex: 'none'
          }}
               src={src}
               onError={() => {
                 this.setState({error: true})
               }}/>
        }
        {
          !src &&
          <div style={{
            width: '100%', height: '100%', flex: 'none',
            background: `#eaeaea url(${image}) no-repeat center / contain`
          }}/>
        }
      </div>
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

export default FileThumbnail