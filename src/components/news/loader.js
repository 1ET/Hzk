import React, { Component } from 'react'
import { Card, Badge, Button, Modal, Toast } from 'antd-mobile'
import Tloader from 'react-touch-loader'
import './loder.css'
import axios from '../../http'
/* 需求。根据type的值来显示不同的组件 */
const prompt = Modal.prompt;

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

const NewsOrTopCom = props => {
    const { list } = props
    let newsTemplate = list.map((item, i) => {
        return (
            <Card key={i}>
                <Card.Header
                    thumb="http://127.0.0.1:8086/public/home.png"
                    thumbStyle={thumbStyle}
                    extra={
                        <div>
                            <Badge text={item.info_title} style={badgeStyle} />
                            <Badge text={item.info_type} style={badgeStyle} />
                        </div>
                    }
                />
            </Card>
        )
    })

    return <div>{newsTemplate}</div>
}

const AnswerCom = props => {
    const { list } = props
    const templatelist = list.map((item, i) => {
        return (
            <Card full key={i}>
                <Card.Body>
                    <div>{item.question_name}</div>
                </Card.Body>
                <Card.Footer
                    content={item.question_tag}
                    extra={
                        <div>
                            <Badge text={item.question_tag} style={badgeStyle} />
                            <Badge text={item.answer_content} style={badgeStyle} />
                        </div>
                    }
                />
            </Card>
        )
    })
    return (
        <div>
            {[
                <Button icon="check-circle-o" size="small" type="warning" key="btn"
                    onClick={() => prompt('请输入你的问题', '',
                        [
                            {
                                text: '取消',
                                onPress: value => new Promise((resolve) => {
                                    resolve()
                                }),
                            },
                            {
                                text: '确定',
                                onPress: async value => {
                                    const res = await axios.post(`infos/question`, { question: value })
                                    const { data: { meta: { msg } } } = res
                                    if (res.status === 200) {
                                        Toast.success(msg, 1);
                                    } else {
                                        Toast.file(msg, 1);
                                    }
                                }

                            },
                        ], 'default', null, ['请输入你的问题'])}
                >
                    发起提问
          </Button>,
                ...templatelist
            ]}
        </div >
    )
}


class Loder extends Component {
    constructor(props) {
        super(props)
        this.state = {
            pagenum: 0,
            pagesize: 2,
            type: 1,
            list: [],
            total: 0,
            hasMore: 1,
            initializing: 1
        }
    }
    getData = async () => {
        const { data: {
            data: {
                list: { data, total }
            } }
        } = await axios.post(`infos/list`, {
            pagenum: this.state.pagenum,
            pagesize: this.state.pagesize,
            type: this.state.type
        })
        this.setState(
            {
                list: data,
                total
            },
            () => {
            }
        )
        return data
    }

    componentDidMount = async () => {
        const { type } = this.props

        this.setState(
            {
                type
            },
            () => {
                this.getData()
            }
        )
    }

    handleRefresh = (resolve, reject) => {
        this.setState({
            pagenum: 0
        }, async () => {
            const res = await this.getData()
            if (res) {
                resolve()
            }
        })
    }
    handleLoadMore = (resolve, reject) => {
        const oldArr = this.state.list
        this.setState({
            pagenum: this.state.pagenum + this.state.pagesize
        }, async () => {
            const newArr = await this.getData()
            this.setState(
                {
                    hasMore:
                        this.state.pagenum > 0 &&
                        this.state.pagenum < this.state.total - this.state.pagesize,
                    list: [...oldArr, ...newArr]
                },
                () => {
                    resolve()
                }
            )
        })
    }
    render() {
        return (
            <div>
                <Tloader
                    initializing={this.state.initializing}
                    onRefresh={this.handleRefresh}
                    hasMore={this.state.hasMore}
                    onLoadMore={this.handleLoadMore}
                >
                    {this.state.type !== 3 ? (
                        <NewsOrTopCom list={this.state.list} />
                    ) : (
                            <AnswerCom list={this.state.list} />
                        )}
                </Tloader>
            </div >
        )
    }
}

export default Loder 