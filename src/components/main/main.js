import React, { Component } from 'react'
import { SearchBar, WhiteSpace, WingBlank, Carousel, Grid, NoticeBar, Card, Badge } from 'antd-mobile';
import axios from '../../http'

const badgeStyle = {
  marginLeft: 12,
  padding: '0 3px',
  backgroundColor: '#fff',
  borderRadius: 2,
  color: '#f19736',
  border: '1px solid #f19736'
}
const thumbStyle = {
  width: '125px',
  height: '95px'
}
class Main extends Component {
  constructor(props) {
    super(props)
    this.state = {
      imagesData: [],
      menuData: Array.from(new Array(8)).map(() => ({
        icon: 'https://gw.alipayobjects.com/zos/rmsportal/WXoqXTHrSnRcUwEaQgXJ.png',
      })),
      imgHeight: 176,
      infoData: [],
      faqData: [],
      houseData: [],
      data: [],
      houseDataNew: [],
    }
  }

  /* 封装请求 */
  getHomeData = async path => {
    const res = await axios.post(`${path}`)
    const { meta, data } = res.data
    if (meta.status === 200) {
      return data.list
    }
  }
  /* 封装数组格式 */
  arrFmt = (arr, ...rest) => {
    let temp = []
    for (let i = 0; i < rest.length; i++) {
      temp.push(arr.splice(0, rest[i]))
    }
    return temp
  }
  async componentDidMount() {
    let imagesData = this.getHomeData('homes/swipe')
    let menuData = this.getHomeData('homes/menu')
    let infoData = this.getHomeData('homes/info')
    let faqData = this.getHomeData('homes/faq')
    let houseData = this.getHomeData('homes/house')
    const dataList = await Promise.all([imagesData,
      menuData,
      infoData,
      faqData,
      houseData])
    this.setState({
      imagesData: dataList[0],
      menuData: dataList[1],
      infoData: dataList[2],
      faqData: dataList[3],
      houseData: dataList[4],
    }, () => {
      let data = this.state.menuData.map((item, i) => {
        return {
          icon: `http://127.0.0.1:8086/public/menu/0${i + 1}.png`,
          text: item.menu_name
        }
      })
      const houseDataNew = this.arrFmt(this.state.houseData, 2, 2, 3)
      this.setState({
        data,
        houseDataNew
      })
    })

  }
  render() {
    let CarouselTemp = this.state.imagesData.map((item, i) => {
      return (
        <a
          key={i}
          style={{ display: 'inline-block', width: '100%', height: this.state.imgHeight }}
        >
          <img
            src={item.original}
            alt="加载失败"
            style={{ width: '100%', verticalAlign: 'top' }}
            onLoad={() => {
              // fire window resize event to change height
              window.dispatchEvent(new Event('resize'));
              this.setState({ imgHeight: 'auto' });
            }}
          />
        </a>
      )
    })
    let infoTemp = this.state.infoData.map((item, i) => {
      return (
        <NoticeBar
          mode="link"
          key={i}
          action={<span>去看看</span>}
          marqueeProps={{ loop: true, style: { padding: '0 7.5px' } }}>
          {item.info_title}
          {item.info_title}
        </NoticeBar>
      )
    })
    let faqTemp = this.state.faqData.map((item, i) => {
      return (
        <Card key={i}>
          <Card.Header
            title={item.question_name}
            thumb={<Badge text="HOT" hot style={{ marginLeft: 12 }} />}
          />
          <Card.Body>
            <div>
              <Badge text={item.question_tag} style={badgeStyle} />
              <Badge text={item.answer_content} style={badgeStyle} />
              <Badge text={item.atime} style={badgeStyle} />
              <Badge text={item.qnum} style={badgeStyle} />
            </div>
          </Card.Body>
        </Card>
      )
    })
    faqTemp = [<b key="b">好客问答</b>, ...faqTemp]
    let houseTemp = this.state.houseDataNew.map((item, i) => {
      let houseTempItem = item.map((item1, j) => {
        return (
          <Card key={j}>
            <Card.Header
              thumb="http://127.0.0.1:8086/public/home.png"
              thumbStyle={thumbStyle}
              extra={<div>
                <Badge text={item1.home_name} style={badgeStyle} />
                <Badge text={item1.home_price} style={badgeStyle} />
                <Badge text={item1.home_desc} style={badgeStyle} />
                <Badge text={item1.home_tags} style={badgeStyle} />
              </div>}
            />
          </Card>
        )
      })
      let title = ['最新开盘', '二手精选', '组个家']
      return (
        <div key={i}>
          <em>{title[i]}</em>
          {houseTempItem}
        </div>
      )
    })
    return (<div>
      {/* 搜索框 */}
      < SearchBar placeholder="自动获取光标" />
      {/* 轮播图 */}
      < Carousel
        infinite
      >
        {CarouselTemp}
      </Carousel >
      {/* 菜单 */}
      < Grid
        data={this.state.data}
        isCarousel
        onClick={_el => console.log(_el)}
      />
      <WhiteSpace size="lg" />
      { /* 咨询 警告框 */}
      {infoTemp}
      {/* 问答卡片 */}
      {faqTemp}
      {/* 房屋信息 */}
      {houseTemp}
    </div >)
  }
}

export default Main
