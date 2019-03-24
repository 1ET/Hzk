import React, { Component } from 'react'
import { NavBar, Icon, TextareaItem, Button } from 'antd-mobile'
import axios from '../../http'
import './chatwindow.css'
import handle, { IMEvent } from './wsclient'

const Chatlist = props => {
    // 详情聊天列表
    let list = props.listContent.map(item => {
        // console.log(item)
        return (
            <li
                key={item.id}
                className={
                    props.currUserUid !== item.from_user
                        ? 'chat-info-left'
                        : 'chat-info-right'
                }
            >
                <img src={item.avatar} alt="" />
                <span className={'info'}>{item.chat_msg}</span>
            </li>
        )
    })
    return list
}

// const resMsg = (data) => {
//     console.log(data)
//     let temp = this.state.list
//     temp.push(JSON.parse(data))
//     this.setState({
//         list: temp
//     })
// }

class ChatWindow extends Component {
    constructor(props) {
        super(props)
        this.state = {
            listdata: [],
            msgContent: 'abc',
            currUserName: '',
            client: null
        }
    }
    backtochat = () => {
        const { hiddenChatWindow, isShow } = this.props
        hiddenChatWindow(isShow)
    }
    resMsg = data => {
        // console.log(data) // {content:"对方不在线"}
        if (data.content === '对方不在线') {
            return
        }

        // data->服务端返回的消息-》字符串
        let temp = this.state.listdata
        // console.log(temp)
        temp.push(JSON.parse(data.content))
        this.setState({
            listdata: temp
        })
    }
    componentDidMount = async () => {
        const { item } = this.props
        const { from_user, to_user } = item

        const { data: { data } } = await axios.post('chats/info', {
            from_user,
            to_user
        })
        this.setState({
            currUserName: item.username,
            listdata: data.list,
        })
        /*聊天 第一步 注册用户 */
        const uid = localStorage.getItem('uid')
        let client = handle(uid, (data) => {
            this.resMsg(data)
        })
        this.setState({
            client
        })
        /*聊天 第二步 接收服务器返回数据 */
        /*聊天 第三步 向服务器发送数据 */
    }
    // 聊天关闭
    closeChat = () => {
        this.backtochat()
    }
    // 发送消息
    sendMsg = () => {

        console.log('发送消息')
        const { from_user, to_user, avatar } = this.props.item
        const { msgContent: chat_msg, listdata, client } = this.state
        let pdata = {
            id: Date.now(),
            from_user,
            to_user,
            avatar,
            chat_msg,
        }
        client.emitEvent(IMEvent.MSG_TEXT_SEND, JSON.stringify(pdata))
        let temp = listdata
        temp.push(pdata)
        this.setState({
            listdata: temp
        })
    }
    handleMsgChange = v => {
        this.setState({
            msgContent: v
        })
    }
    render() {
        let currUserUid = 1 * localStorage.getItem('uid')
        return (
            <div className="chat-window">
                <NavBar
                    className="chat-window-title"
                    mode="dark"
                    icon={<Icon type="left" />}
                    onLeftClick={this.backtochat}
                >
                    {this.state.currUserName}
                </NavBar>
                <div className="chat-window-content">
                    <ul>
                        <Chatlist
                            currUserUid={currUserUid}
                            listContent={this.state.listdata}
                        />
                    </ul>
                </div>
                <div>
                    <div className="chat-window-input">
                        <TextareaItem
                            value={this.state.msgContent}
                            onChange={this.handleMsgChange}
                            placeholder="请输入内容..."
                        />
                        <Button type="primary" onClick={this.closeChat}>
                            关闭
                        </Button>
                        <Button onClick={this.sendMsg}>发送</Button>
                    </div>
                </div>
            </div>
        )
    }
}
export default ChatWindow