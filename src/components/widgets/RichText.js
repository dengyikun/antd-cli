/**
 * Created by DengYiKun on 2017/3/8.
 */
import React, {Component, PropTypes} from 'react'
import ReactQuill from 'react-quill'
import Gallery from './Gallery'
import 'react-quill/dist/quill.snow.css'
import '../../assets/styles/components/widgets/RichText.scss'

class RichText extends Component {
    static propTypes = {}//props 类型检查

    static defaultProps = {}//默认 props

    static contextTypes = {}//context 显式注册

    constructor(props) {
        super(props)
        this.state = {
            isGalleryVisible: false,
            quill: {}
        }

    }//初始化 state

    componentWillMount() {
    }//插入 DOM 前

    componentWillReceiveProps(nextProps) {
    }//接收新 props

    insertStar = function (_this) {
        return function () {
          _this.setState({isGalleryVisible: true, quill: this.quill})
        }
    }

    onGalleryOk = (image) => {
        const cursorPosition = this.state.quill.getSelection().index
        this.state.quill.insertEmbed(cursorPosition, 'image', image.file)
        this.state.quill.setSelection(cursorPosition + 1)
    }

    render() {
        return (
            <div>
                <div id="ql-toolbar">
                    <select className="ql-header" defaultValue="0">
                        <option value="1">大标题</option>
                        <option value="2">小标题</option>
                        <option value="0">正文</option>
                    </select>
                    <button className="ql-bold"/>
                    <button className="ql-italic"/>
                    <button className="ql-underline"/>
                    <select className="ql-color"/>
                    <select className="ql-background"/>
                    <button className="ql-list" value="ordered"/>
                    <button className="ql-list" value="bullet"/>
                    <select className="ql-align"/>
                    <button className="ql-link"/>
                    <button className="ql-image"/>
                </div>
                <Gallery visible={this.state.isGalleryVisible}
                         onOk={this.onGalleryOk}
                         onCancel={() => this.setState({isGalleryVisible: false})}/>
                <ReactQuill style={{height: '600px'}}
                            modules={{
                                toolbar: {
                                    container: "#ql-toolbar",
                                    handlers: {
                                        "image": this.insertStar(this),
                                    }
                                }
                            }}
                            value={this.props.value || ''}
                            onChange={this.props.onChange}
                />
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

export default RichText