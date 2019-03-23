import React, { Component } from 'react'
import { Tabs, WhiteSpace, Badge, NavBar, Icon, Card, SegmentedControl, InputItem } from 'antd-mobile';
import Tloader from 'react-touch-loader';
import './news.css'
import Loader from './loader'

const tabs = [
  { title: '资讯' },
  { title: '头条' },
  { title: '问答' },
]

class News extends Component {
  constructor(props) {
    super(props)
    this.state = {

    }
  }
  changeTab = (tab, index) => {
    switch (index) {
      case 0:
        this.tabOne(index)
        break;
      case 1:
        this.tabTwo(index)
        break;
      case 2:
        this.tabThree(index)
        break;
      default:
        break;
    }
  }
  tabOne = (index) => {
    return <Loader type={index+1} />
  }
  tabTwo = (index) => {
    return <Loader type={index+1} />
  }
  tabThree = (index) => {
    return <Loader type={index+1} />
  }
  render() {
    return <div className='news'>
      <NavBar
        mode="light"
      >资讯</NavBar>
      <Tabs tabs={tabs}
        initialPage={0}
        animated={false}
        useOnPan={false}
        onChange={this.changeTab}
      >
        {this.tabOne(0)}
        {this.tabTwo(1)}
        {this.tabThree(2)}
      </Tabs>

    </div>
  }
}

export default News
