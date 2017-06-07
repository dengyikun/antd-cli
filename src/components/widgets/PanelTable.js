/**
 * Created by DengYiKun on 2017/3/8.
 */
import React, {Component, PropTypes} from 'react'
import {Spin, Row, Col, Button, Form, Table} from 'antd'
import {HTTP, THEME} from '../../config'

const FormItem = Form.Item

class PanelTable extends Component {
    static propTypes = {
        name: PropTypes.string.isRequired,
        columns: PropTypes.array.isRequired,
        url: PropTypes.string.isRequired,
        add: PropTypes.func,
        screens: PropTypes.array,
        screen: PropTypes.object,
        refresh: PropTypes.object,
        actions: PropTypes.object,
    }//props 类型检查

    static defaultProps = {
        screen: {},
        // screens: [
        //     {
        //         key: '',
        //         value: '',
        //         object: '',
        //         hidden: false
        //     }
        // ]
    }//默认 props

    static contextTypes = {
        router: PropTypes.object
    }//context 显式注册

    constructor(props) {
        super(props)
        this.state = {
            data: [],
            current: 1,//当前页
            total: 0,//总条目数
            pageSize: 10,//分页大小
            isLoading: false,
        }
    }//初始化 state

    componentWillMount() {
        this.changePage(1)
    }//插入 DOM 前


    componentWillReceiveProps(nextProps) {
        if (nextProps.refresh !== this.props.refresh) {
            this.changePage(1)
        }
    }//接收新 props

    changePage = (page) => {
        this.setState({isLoading: true})

        const screen = {
            ...this.context.router.location.query,
            ...this.props.screen,
            ...this.props.form.getFieldsValue(),
        }

        this.context.router.push({
            pathname: this.context.router.location.pathname,
            query: {
                ...this.context.router.location.query,
                ...this.props.form.getFieldsValue(),
            }
        })

        HTTP.fetch('GET', this.props.url, null, (data) => {
            this.setState({
                total: data.count,
                current: page,
                data: data.results,
                isLoading: false
            })
        }, {
            page: page ? page : this.state.current,
            ...screen
        }, () => {
            this.setState({isLoading: false})
        })
    }

    resetScreen = () => {
        let query = this.context.router.location.query
        this.props.screens.map((screen) => {
            query[screen.key] = screen.value || ''
        })
        this.props.form.setFieldsValue(query)
        this.context.router.push({
            pathname: this.context.router.location.pathname,
            query
        })
    }

    render() {
        const {getFieldDecorator} = this.props.form
        const pagination = {
            current: this.state.current,
            total: this.state.total,
            pageSize: this.state.pageSize,
            showQuickJumper: true,
            onChange: (page) => {
                this.changePage(page)
            }
        }

        return (
            <Spin spinning={this.state.isLoading}>
                {
                    this.props.screens &&
                    <Row>
                        {
                            this.props.screens.map((screen) =>
                                <Col {...(screen.hidden ? {span: 0} : THEME.formSpan6)}
                                     key={screen.key}>
                                    <FormItem {...THEME.formSpan6Layout}
                                              label={screen.label}>
                                        {getFieldDecorator(screen.key, {
                                            initialValue: this.context.router.location.query[screen.key]
                                            || screen.value || '',
                                            onChange: (value) => {
                                                if (screen.onChange) {
                                                    screen.onChange(value, this.props.form)
                                                }
                                            }
                                        })(
                                            screen.object
                                        )}
                                    </FormItem>
                                </Col>
                            )
                        }
                        <Col span={24} style={{marginBottom: 20}}>
                            <Button type="primary" onClick={() => this.changePage(1)}>查询</Button>
                            <Button style={{marginLeft: 24}} onClick={this.resetScreen}>重置</Button>
                        </Col>
                        <Col span={24}>
                            <hr/>
                        </Col>
                    </Row>
                }
                <Row>
                    <Col span={12}>
                        <h2>{this.props.name}列表</h2>
                    </Col>
                    <Col span={12} style={{marginBottom: 20}}>
                        {
                            this.props.add &&
                            <Button onClick={this.props.add} type="primary"
                                    style={{float: 'right'}}>添加</Button>
                        }
                        {
                            this.props.actions
                        }
                    </Col>
                    <Col span={24}>
                        <Table rowKey={(record, index) => index} columns={this.props.columns}
                               dataSource={this.state.data} pagination={pagination}/>
                    </Col>
                </Row>
            </Spin>
        )
    }//渲染
}

export default Form.create()(PanelTable)