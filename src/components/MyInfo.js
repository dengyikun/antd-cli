/**
 * Created by Loki on 2017/1/24.
 */
import React, {Component, PropTypes} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {Input, Row, Col, Button, Form, Tabs, message} from 'antd';
import {Image, EnumSelect} from './widgets';
import {HTTP, ENUM, THEME, VALIDATOR} from '../config'
import userAction from '../actions/userAction'

const FormItem = Form.Item
const TabPane = Tabs.TabPane

const mapStateToProps = (state) => ({
    user: state.user
})

const mapDispatchToProps = (dispatch) => ({
    userAction: bindActionCreators(userAction, dispatch)
})

class UserInfoUI extends Component {
    static propTypes = {
        user: PropTypes.object.isRequired,
        userAction: PropTypes.object.isRequired
    }//props 类型检查

    static defaultProps = {}//默认 props

    constructor(props) {
        super(props)
        this.state = {}
    }//初始化 state

    render() {
        return (
            <Tabs type="card" className="ant-layout-content-body">
                <TabPane tab="个人信息" key="1">
                    <InfoTabPane user={this.props.user} userAction={this.props.userAction}/>
                </TabPane>
                <TabPane tab="修改密码" key="3">
                    <PasswordTabPane user={this.props.user} userAction={this.props.userAction}/>
                </TabPane>
            </Tabs>
        )
    }//渲染
}

const InfoTabPane = Form.create()(
    class extends Component {
        static propTypes = {
            user: PropTypes.object.isRequired,
            userAction: PropTypes.object.isRequired
        }//props 类型检查

        saveUserInfo = () => {
            this.props.form.validateFields((err, values) => {
                if (!err) {
                    let data = this.props.form.getFieldsValue()
                    HTTP.patch('user_info', data, (user) => {
                        message.success('信息修改成功！')
                        this.props.userAction.setUser(user)
                    })
                }
            })
        }

        render() {
            const {getFieldDecorator} = this.props.form
            return (
                <Form>
                    <span>请认真填写</span>
                    <hr/>
                    <h3>基本信息</h3>
                    <Row>
                        <Row>
                            <Col {...THEME.formSpan12}>
                                <FormItem {...THEME.formSpan12Layout} label="用户名">
                                    {getFieldDecorator('name', {
                                        initialValue: this.props.user.name,
                                        rules: [
                                            {required: true, message: '这是必填项！'},
                                            {validator: VALIDATOR.checkUsername}
                                        ]
                                    })(
                                        <Input disabled/>
                                    )}
                                </FormItem>
                                <FormItem {...THEME.formSpan12Layout} label="用户类型">
                                    {getFieldDecorator('role', {
                                        initialValue: this.props.user.role,
                                        rules: [
                                            {required: true, message: '这是必填项！'}
                                        ]
                                    })(
                                        <EnumSelect enum={ENUM.role} disabled/>
                                    )}
                                </FormItem>
                                <FormItem {...THEME.formSpan12Layout} label="姓名">
                                    {getFieldDecorator('nick_name', {
                                        initialValue: this.props.user.nick_name,
                                        rules: [
                                            {required: true, message: '这是必填项！'}
                                        ]
                                    })(
                                        <Input disabled/>
                                    )}
                                </FormItem>
                            </Col>
                            <Col {...THEME.formSpan12}>
                                <FormItem>
                                    {getFieldDecorator('avatar', {
                                        initialValue: this.props.user.avatar,
                                        onChange: (avatar) => {
                                            this.props.form.setFieldsValue({'avatar': avatar})
                                        }
                                    })(
                                        <Image style={{width: 110, height: 140, margin: '0 auto'}}
                                               scene={'avatar'}/>
                                    )}
                                </FormItem>
                            </Col>
                            <Col span={0}>
                                <FormItem>
                                    {getFieldDecorator('avatar', {
                                        initialValue: this.props.user.avatar
                                    })(
                                        <Input/>
                                    )}
                                </FormItem>
                            </Col>
                        </Row>
                        <Col {...THEME.formSpan12}>
                            <FormItem {...THEME.formSpan12Layout} label="性别">
                                {getFieldDecorator('sex', {
                                    initialValue: this.props.user.sex,
                                    rules: [{required: true, message: '这是必填项！'}]
                                })(
                                    <EnumSelect enum={ENUM.sex}/>
                                )}
                            </FormItem>
                        </Col>
                        <Col {...THEME.formSpan12}>
                            <FormItem {...THEME.formSpan12Layout} label="职务">
                                {getFieldDecorator('job', {
                                    initialValue: this.props.user.job,
                                })(
                                    <Input/>
                                )}
                            </FormItem>
                        </Col>
                        <Col span={24}>
                            <hr/>
                        </Col>
                        <Col span={24}>
                            <Button type="primary" style={{float: 'right'}}
                                    onClick={this.saveUserInfo} size="large">保存</Button>
                        </Col>
                    </Row>
                </Form>
            )
        }
    }
)

const PasswordTabPane = Form.create()(
    class extends Component {
        static propTypes = {
            user: PropTypes.object.isRequired,
            userAction: PropTypes.object.isRequired
        }//props 类型检查

        changePassword = () => {
            this.props.form.validateFields((err, values) => {
                if (!err) {
                    let data = this.props.form.getFieldsValue(['old_password', 'password'])
                    HTTP.patch('user_info', data, (user) => {
                        message.success('密码修改成功！')
                        this.props.userAction.setUser(user)
                    })
                }
            })
        }

        checkPW = (rule, value, callback) => {
            const form = this.props.form
            if (value && value !== form.getFieldValue('password')) {
                callback('两次输入的密码不一致！')
            } else {
                callback()
            }
        }

        render() {
            const {getFieldDecorator} = this.props.form
            return (
                <Form>
                    <FormItem {...THEME.formSpan12Layout} label="原密码">
                        {getFieldDecorator('old_password', {
                            rules: [
                                {required: true, message: '请输入原密码！'}
                            ]
                        })(
                            <Input type="password"/>
                        )}
                    </FormItem>
                    <FormItem {...THEME.formSpan12Layout} label="新密码">
                        {getFieldDecorator('password', {
                            rules: [
                                {required: true, message: '请输入新密码！'},
                                {min: 6, message: '请输入至少6位密码！'}
                            ]
                        })(
                            <Input type="password"/>
                        )}
                    </FormItem>
                    <FormItem {...THEME.formSpan12Layout} label="重复密码">
                        {getFieldDecorator('confirmPassword', {
                            rules: [
                                {validator: this.checkPW},
                                {required: true, message: '请重复输入新密码！'}
                            ]
                        })(
                            <Input type="password"/>
                        )}
                    </FormItem>
                    <FormItem {...THEME.formSpan12Layout} label=" ">
                        <Button type="primary" onClick={this.changePassword} size="large">保存</Button>
                    </FormItem>
                </Form>
            )
        }
    }
)

const UserInfo = connect(
    mapStateToProps,
    mapDispatchToProps
)(UserInfoUI)

export default Form.create()(UserInfo)