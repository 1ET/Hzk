import React, { Component } from 'react'
import { NavBar, Icon } from 'antd-mobile'
import 'react-virtualized/styles.css'
import { SearchBar, WhiteSpace, WingBlank, Carousel, Grid, NoticeBar, Card, Badge } from 'antd-mobile';
import { List } from 'react-virtualized'
import axios from '../../http.js'
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

class details extends Component {
    constructor(props) {
        super(props)
        this.state = {
            title: '',
            data: [],
            High: 400,
            Wide: 700
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
    /* 获取房屋信息 */
    async componentDidMount() {
        const High = document.documentElement.clientHeight
        const Wide = document.documentElement.clientWidth
        const { history, location: { state: { query: { info: { text, id } } } } } = this.props
        const res = await axios.post(`homes/list`, { home_type: id })
        const { data: { data } } = res
        this.setState({
            title: text,
            data,
            High,
            Wide,
        })
    }
    /*上一页*/
    goBackFn = () => {
        this.props.history.goBack()
    }
    rowRenderer = ({
        key,
        index,
        isVisible,
        style
    }) => {
        const item = this.state.data[index]
        return (
            <Card key={index}>
                <Card.Header
                    thumb="http://127.0.0.1:8086/public/home.png"
                    thumbStyle={thumbStyle}
                    extra={<div>
                        <Badge text={item.home_name} style={badgeStyle} />
                        <Badge text={item.home_price} style={badgeStyle} />
                        <Badge text={item.home_desc} style={badgeStyle} />
                        <Badge text={item.home_tags} style={badgeStyle} />
                    </div>}
                />
            </Card>
        )
    }
    render() {
        // // console.log(this.state.data)
        // let houseTemp = this.state.data.map((item, i) => {
        //     return (
        //         <Card key={i}>
        //             <Card.Header
        //                 thumb="http://127.0.0.1:8086/public/home.png"
        //                 thumbStyle={thumbStyle}
        //                 extra={<div>
        //                     <Badge text={item.home_name} style={badgeStyle} />
        //                     <Badge text={item.home_price} style={badgeStyle} />
        //                     <Badge text={item.home_desc} style={badgeStyle} />
        //                     <Badge text={item.home_tags} style={badgeStyle} />
        //                 </div>}
        //             />
        //         </Card>
        //     )
        // })

        return (
            <div>
                <NavBar
                    mode="light"
                    icon={<Icon type="left" />}
                    onLeftClick={() => { this.goBackFn() }}
                >{this.state.title}</NavBar>
                <List
                    width={this.state.Wide}
                    height={this.state.High}
                    rowCount={this.state.data.length}
                    rowHeight={120}
                    rowRenderer={this.rowRenderer}
                />,

            </div>
        )
    }
}

export default details