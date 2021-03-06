import React, { Component } from 'react'
import { TabBar } from "antd-mobile"
import Main from '../main/main'
import Chat from '../chat/chat'
import Mine from '../mine/mine'
import News from '../news/news'
class Home extends Component {
    constructor(props) {
        super(props)
        this.state = {
            selectedTab: 'Chat',
            hidden: false,
            fullScreen: true,
        }
    }
    renderContent = () => {
        const selectedTab = this.state.selectedTab
        switch (selectedTab) {
            case 'Main':
                return < Main history={this.props.history} />
                break;
            case 'Chat':
                return < Chat />
                break;
            case 'Mine':
                return < Mine />
                break;
            case 'News':
                return < News />

                break;
            default:
                break;
        }
    }
    render() {
        return (
            <div
                style={
                    this.state.fullScreen
                        ? { position: 'fixed', height: '100%', width: '100%', top: 0 }
                        : { height: 400 }
                }
            >
                <TabBar
                    unselectedTintColor="#949494"
                    tintColor="#33A3F4"
                    barTintColor="white"
                    hidden={this.state.hidden}
                    tabBarPosition="bottom"            >
                    <TabBar.Item
                        title="Life"
                        key="Life"
                        icon={<div style={{
                            width: '22px',
                            height: '22px',
                            background: 'url(/images/泽莫男爵.svg) center center /  21px 21px no-repeat'
                        }}
                        />
                        }
                        selectedIcon={<div style={{
                            width: '22px',
                            height: '22px',
                            background: 'url(/images/复仇者联盟-幻视.svg) center center /  21px 21px no-repeat'
                        }}
                        />
                        }
                        selected={this.state.selectedTab === 'Main'}
                        onPress={() => {
                            this.setState({
                                selectedTab: 'Main',
                            });
                        }}
                        data-seed="logId"
                    >
                        {this.renderContent()}
                    </TabBar.Item>
                    <TabBar.Item
                        icon={
                            <div style={{
                                width: '22px',
                                height: '22px',
                                background: 'url(/images/灭霸.svg) center center /  21px 21px no-repeat'
                            }}
                            />
                        }
                        selectedIcon={
                            <div style={{
                                width: '22px',
                                height: '22px',
                                background: 'url(/images/复仇者联盟-幻视.svg) center center /  21px 21px no-repeat'
                            }}
                            />
                        }
                        title="Koubei"
                        key="Koubei"
                        selected={this.state.selectedTab === 'News'}
                        onPress={() => {
                            this.setState({
                                selectedTab: 'News',
                            });
                        }}
                        data-seed="logId1"
                    >
                        {this.renderContent()}
                    </TabBar.Item>
                    <TabBar.Item
                        icon={
                            <div style={{
                                width: '22px',
                                height: '22px',
                                background: 'url(/images/异人族-黑蝠王.svg) center center /  21px 21px no-repeat'
                            }}
                            />
                        }
                        selectedIcon={
                            <div style={{
                                width: '22px',
                                height: '22px',
                                background: 'url(/images/复仇者联盟-幻视.svg) center center /  21px 21px no-repeat'
                            }}
                            />
                        }
                        title="Friend"
                        key="Friend"
                        selected={this.state.selectedTab === 'Chat'}
                        onPress={() => {
                            this.setState({
                                selectedTab: 'Chat',
                            });
                        }}
                    >
                        {this.renderContent()}
                    </TabBar.Item>
                    <TabBar.Item
                        icon={{ uri: '/images/捍卫者联盟-夜魔侠.svg' }}
                        selectedIcon={{ uri: '/images/复仇者联盟-幻视.svg' }}
                        title="My"
                        key="my"
                        selected={this.state.selectedTab === 'Mine'}
                        onPress={() => {
                            this.setState({
                                selectedTab: 'Mine',
                            });
                        }}
                    >
                        {this.renderContent()}
                    </TabBar.Item>
                </TabBar>
            </div>
        )
    }
}

export default Home 