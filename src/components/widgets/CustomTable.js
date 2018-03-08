/**
 * Created by DengYiKun on 2017/3/8.
 */
import React, {Component, PropTypes} from 'react'
import {Spin, Row, Col, Button, Form, Table, Icon} from 'antd'
import CustomFormItem from './CustomFormItem'
import {HTTP, THEME} from '../../utils'

class CustomTable extends Component {
    static propTypes = {
        columns: PropTypes.array.isRequired, //Table columns
        url: PropTypes.string.isRequired, //请求数据的 url
        name: PropTypes.string, //显示在表格左上角的名称
        add: PropTypes.func, //添加方法
        hasOpen: PropTypes.bool, //展示在表格顶部的过滤属性是否需要支持展开
        screens: PropTypes.array, //展示在表格顶部的过滤属性
        screen: PropTypes.object, //不展示在表格顶部的过滤属性
        refresh: PropTypes.object, //刷新方法
        actions: PropTypes.object, //额外的操作业务，放置在添加按钮旁边
        pageSize: PropTypes.number,//分页大小
        isPOST: PropTypes.bool,//是否是 POST 的请求方式获取数据
    }//props 类型检查

    static defaultProps = {
        pageSize: 10,
    }//默认 props

    static contextTypes = {}//context 显式注册

    constructor(props) {
        super(props)
        this.state = {
            data: [],
            current: 1,//当前页
            total: 0,//总条目数
            isLoading: false,
            isOpen: false,
        }
    }//初始化 state

    componentWillMount() {
        this.changePage(1)
    }//插入 DOM 前


    componentWillReceiveProps(nextProps) {
        if (nextProps.refresh !== this.props.refresh) {
            this.changePage()
        }
    }//接收新 props

    changePage = (page) => {
        this.setState({isLoading: true})
        page = page || this.state.current
        const data = {
            page,
            page_size: this.props.pageSize,
            ...this.props.screen,
            ...this.props.form.getFieldsValue(),
        }

        if (this.props.isPOST) {
            HTTP.post(this.props.url, data)
                .then((data) => {
                    this.setState({
                        total: data.count,
                        current: page,
                        data: data.results,
                        isLoading: false
                    })
                })
                .catch(() => {
                    this.setState({isLoading: false})
                })
        } else {
            HTTP.get(this.props.url, data)
                .then((data) => {
                    this.setState({
                        total: data.count,
                        current: page,
                        data: data.results,
                        isLoading: false
                    })
                })
                .catch(() => {
                    this.setState({isLoading: false})
                })
        }
    }

    resetScreen = () => {
        this.props.form.resetFields()
    }

    render() {
        const {hasOpen, className, form, name, add, actions, columns, children, pageSize} = this.props
        const {current, total, isOpen, isLoading, data} = this.state
        const pagination = {
            current,
            total,
            pageSize,
            showQuickJumper: true,
            onChange: (page) => {
                this.changePage(page)
            }
        }
        const screens = hasOpen && !isOpen ?
            this.props.screens.slice(0, 2) : this.props.screens

        return (
            <Spin spinning={isLoading} wrapperClassName={className}>
                {
                    screens &&
                    <Row gutter={20}>
                        {
                            screens.map(formItem => formItem &&
                            <CustomFormItem id={formItem.key} form={form} {...formItem}/>)
                        }
                        <Col {...(isOpen ? {span: 24} : THEME.span_8)}
                             style={{
                                 paddingTop: 3, userSelect: 'none', marginBottom: 24,
                                 textAlign: hasOpen && isOpen ? 'right' : 'left'
                             }}>
                            <Button type="primary" style={{marginRight: 10}}
                                    onClick={() => this.changePage(1)}>查询</Button>
                            <Button style={{marginRight: 10}}
                                    onClick={this.resetScreen}>重置</Button>
                            {
                                hasOpen && isOpen &&
                                <a style={{whiteSpace: 'nowrap'}}
                                   onClick={_ => this.setState({isOpen: !isOpen})}>
                                    收起&nbsp;<Icon type="up"/>
                                </a>
                            }
                            {
                                hasOpen && !isOpen &&
                                <a style={{whiteSpace: 'nowrap'}}
                                   onClick={_ => this.setState({isOpen: !isOpen})}>
                                    展开&nbsp;<Icon type="down"/>
                                </a>
                            }
                        </Col>
                        <Col span={24}>
                            <hr/>
                        </Col>
                    </Row>
                }
                <Row>
                    <Col span={12}>
                        {
                            name &&
                            <h2>{name}列表</h2>
                        }
                    </Col>
                    <Col span={12} style={{marginBottom: 20}}>
                        {
                            add &&
                            <Button onClick={add} type="primary"
                                    style={{float: 'right'}}>添加</Button>
                        }
                        {actions}
                    </Col>
                    <Col span={24}>
                        <Table rowKey={(record, index) => index} columns={columns}
                               dataSource={data} pagination={pagination}/>
                    </Col>
                </Row>
                {children}
            </Spin>
        )
    }//渲染
}

export default Form.create()(CustomTable)