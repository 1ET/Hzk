import React, { Component } from 'react'
import { NavBar, Icon } from 'antd-mobile'
import './bmap.css'

class Bmap extends Component {
    constructor(props) {
        super(props)
        this.state = {
            text: '',
        }
    }
    backToMain = () => {
        const { history } = this.props
        history.goBack()
    }
    initMap = () => {
        const BMap = window.BMap
        let map = new BMap.Map('allmap')
        let point = new BMap.Point(116.404, 39.915)
        map.addControl(new BMap.NavigationControl())
        map.addControl(new BMap.ScaleControl())
        map.addControl(new BMap.OverviewMapControl())
        map.addControl(new BMap.MapTypeControl())
        map.addControl(new BMap.GeolocationControl())
        map.setCurrentCity('北京') // 仅当设置城市信息时，MapTypeControl的切换功能才能可用
        map.centerAndZoom(point, 15)
    }
    componentDidMount = () => {
        this.initMap()
        const { location: { state: { query: { info: { text } } } } } = this.props
        this.setState({
            text
        })
    }
    render() {
        return (
            <div>
                <NavBar
                    mode="light"
                    icon={<Icon type="left" />}
                    onLeftClick={this.backToMain}
                >
                    {this.state.text}
                </NavBar>
                <div id="allmap" />
            </div>
        )
    }
}

export default Bmap