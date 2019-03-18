import React, { Component } from 'react'
import { Flex, WhiteSpace, NavBar, Button, List, InputItem, Toast, WingBlank } from 'antd-mobile';

import 'antd-mobile/dist/antd-mobile.css'
import './login.css'
import axios from '../../http'

class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {
            uname: '',
            pwd: ''
        }
    }
    changeState = (k, v) => {
        this.setState({
            [k]: v
        })
    }
    handleLogin = async () => {
        const { history } = this.props
        console.log(this.props)
        const users = this.state
        const res = await axios.post(`users/login`, users)
        const { data, meta } = res.data
        if (meta.status === 200) {
            localStorage.setItem('token', data.token)
            history.push('/')
        } else {
            Toast.fail(meta.msg, 1);
        }
    }
    render() {
        return (
            <Flex direction="column" justify="center">

                <Flex.Item className="navbar">
                    <NavBar mode="dark">登录</NavBar>
                </Flex.Item>
                <WhiteSpace size="sm" />
                <Flex.Item>
                    <List>
                        <WingBlank>
                            <InputItem
                                value={this.state.uname}
                                onChange={(v) => { this.changeState('uname', v) }}
                            >账号</InputItem>
                            <InputItem
                                value={this.state.pwd}
                                onChange={(v) => { this.changeState('pwd', v) }}
                            >密码</InputItem>
                        </WingBlank>
                        <Button type="primary" style={{ marginTop: '4px' }} onClick={this.handleLogin}>登录</Button>
                    </List>
                </Flex.Item>
            </Flex>
        )
    }
}

export default Login