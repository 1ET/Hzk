import React, { Component } from 'react'
import { NavBar } from 'antd-mobile'
import axios from '../../http'
import './chat.css'
import Chatwindow from './chatWinodw'

class Chat extends Component {
  constructor(props) {
    super(props)
    this.state = {
      list: [],
      isShow: true,
      data: ['1', '2', '3'],
      item: {},
    }
  }
  componentDidMount = async () => {
    const { data: { data: { list } } } = await axios.post(`chats/list`)
    this.setState({
      list
    })
  }
  showChatwindow = (item) => {
    this.setState({
      isShow: false,
      item
    })
  }
  hiddenChatWindow = (isShow) => {
    this.setState({
      isShow
    })
  }
  render() {
    const listContet = this.state.list.map((item, i) => {
      // console.log(item)
      return (
        <li key={item.id} onClick={this.showChatwindow.bind(this, item)}>
          <div className="avarter">
            <img src={'http://127.0.0.1:8086/' + item.avatar} alt="avarter" />
            <span className="name">{item.username}</span>
            <span className="info">{item.chat_msg}</span>
            <span className="time">{item.ctime}</span>
          </div>
        </li>
      )
    })

    return (<div>
      {this.state.isShow ?
        <div>
          <NavBar
            mode="light"
          >{'微聊'}</NavBar>
          <div className="chat-list">
            <ul>{listContet}</ul>
          </div>
        </div>
        : <Chatwindow item={this.state.item} hiddenChatWindow={this.hiddenChatWindow} isShow={!this.state.isShow} />}
    </div>)
  }
}

export default Chat
