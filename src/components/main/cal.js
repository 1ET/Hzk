import React, { Component } from 'react'
import { Tabs, WhiteSpace, Badge, NavBar, Icon, Card, SegmentedControl, InputItem } from 'antd-mobile';
import EchartsEle from './echart'

const tabs = [
    { title: '公积金贷款' },
    { title: '商业贷款' },
    { title: '组合贷款' },
]
const titles = ['贷款方式', '贷款年限', '贷款利率']
const segValues = {
    0: ['按贷款总额', '按面积算'],
    1: ['10', '20', '30'],
    2: ['3.25', '9', '9.5']
}

class Cal extends Component {
    constructor(props) {
        super(props)
        this.state = {
            title: '',
            High: '',
            Wide: '',
        }
    }
    componentDidMount = () => {
        const High = document.documentElement.clientHeight
        const Wide = document.documentElement.clientWidth
        const { history, location: { state: { query: { info: { text, id } } } } } = this.props
        this.setState({
            title: text,
            High,
            Wide,
        })
    }
    onValueChange = value => {
        // console.log(value)
    }
    goBackFn = () => {
        this.props.history.goBack()
    }
    render() {
        let segTemplate = titles.map((item, i) => {
            return (
                <Card.Header
                    key={i}
                    title={item}
                    extra={<SegmentedControl values={segValues[i]
                    } onValueChange={this.onValueChange} />}
                />
            )
        })
        segTemplate.splice(1, 0, <Card.Header
            key={'input'}
            title="贷款总额"
            extra={<InputItem
                placeholder="0.00"
                extra="¥"
            ></InputItem>}
        />)
        return (
            <div>
                <NavBar
                    mode="light"
                    icon={<Icon type="left" />}
                    onLeftClick={() => { this.goBackFn() }}
                >{this.state.title}</NavBar>
                <WhiteSpace />
                <Tabs tabs={tabs}
                    initialPage={0}
                    onChange={(tab, index) => { console.log('onChange', index, tab); }}
                    onTabClick={(tab, index) => { console.log('onTabClick', index, tab); }}
                >
                    <div>
                        <Card full>
                            {segTemplate}
                        </Card>
                        <EchartsEle />
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '150px', backgroundColor: '#fff' }}>
                        Content of second tab
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '150px', backgroundColor: '#fff' }}>
                        Content of third tab
                    </div>
                </Tabs>
            </div >
        )
    }
}

export default Cal