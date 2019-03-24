import React from 'react'
import './index.css'
import axios from '../../http'
import { Grid, Button, Modal, Slider } from 'antd-mobile'

import AvatarEditor from 'react-avatar-editor'
import { Module } from 'module';
let gridtext = [
  '看房记录',
  '我的订单',
  '我的收藏',
  '个人资料',
  '身份认证',
  '联系我们'
]
// 选择
class SelectImageModal extends React.Component {
  constructor(props) {
    super(props)
    this.myRef = React.createRef()
    this.state = {
      modal1: false
    }
  }
  componentDidMount = () => {
    const { modal1 } = this.props
    this.setState({
      modal1
    })
  }
  onClose = () => {
    const { close } = this.props
    // 获取file
    const fileData = this.myRef.current.files[0]
    // 获取inputDOM元素的type="file"文本域(表单的值)
    close(false, fileData)
  }
  render() {
    return (
      <Modal
        visible={this.state.modal1}
        transparent
        maskClosable={true}
        onClose={this.onClose}
        title="选择图片"
        footer={[
          {
            text: '确定',
            onPress: () => {
              this.onClose()
            }
          }
        ]}
        wrapProps={{ onTouchStart: this.onWrapTouchStart }}
      >
        <input ref={this.myRef} type="file" name="file" />
      </Modal>
    )
  }
}
// 裁切
class CoreImageModal extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      modal2: false,
      scale: 1
    }
  }
  componentDidMount = () => {
    const { modal2 } = this.props
    console.log(modal2)
    this.setState({
      modal2,
      scale: 1
    })
  }
  onClose = () => {
    const { close } = this.props
    close(false)
  }
  sliderChange = (v) => {
    this.setState({
      scale: v * 0.1
    })
  }
  sliderAfterChange = () => {

  }
  render() {
    return (
      <Modal
        visible={this.state.modal2}
        transparent
        maskClosable={true}
        onClose={this.onClose}
        title="裁切图片"
        footer={[
          {
            text: '确定',
            onPress: () => {
              this.onClose()
            }
          }
        ]}
        wrapProps={{ onTouchStart: this.onWrapTouchStart }}
      >
        <AvatarEditor
          image={this.props.fileData}
          width={150}
          height={150}
          border={50}
          borderRadius={75}
          color={[255, 255, 255, 0.6]} // RGBA
          scale={this.state.scale}
          rotate={0}
        />
        <Slider
          style={{ marginLeft: 30, marginRight: 30 }}
          defaultValue={10}
          min={10}
          max={20}
          onChange={this.sliderChange}
          onAfterChange={this.sliderAfterChange}
          trackStyle={{
            backgroundColor: 'skyblue',
            height: '5px',
          }}
          railStyle={{
            backgroundColor: 'black',
            height: '5px',
          }}
          handleStyle={{
            borderColor: 'blue',
            height: '14px',
            width: '14px',
            marginLeft: '-7px',
            marginTop: '-4.5px',
            backgroundColor: 'blue',
          }}
        />
      </Modal>
    )
  }
}

class Mine extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      uname: '',
      data: Array.from(new Array(6)).map((_val, i) => ({
        icon:
          'https://gw.alipayobjects.com/zos/rmsportal/nywPmnTAvTmLusPxHPSu.png',
        text: `name${i}`
      })),
      isImageModal: false,
      isCoreModal: false,
      fileData: null
    }
  }

  componentDidMount = async () => {
    // Grid数据修改
    let data = Array.from(new Array(6)).map((item, i) => {
      return {
        id: i + 1,
        icon: `http://127.0.0.1:8086/public/menu/0${i + 1}.png`,
        text: gridtext[i]
      }
    })
    // 获取用户信息
    const user_id = localStorage.getItem('uid')
    const res = await axios.post(`my/info`, { user_id })
    this.setState({
      data,
      uname: res.data.data.username
    })
  }
  showImageModal = () => {
    this.setState({
      isImageModal: true
    })
  }
  openImageModal = () => {

  }
  closeImageModal = (isShow, fileData) => {
    this.setState({
      isImageModal: isShow
    })
    if (!fileData) {
      return
    }
    this.setState({
      isCoreModal: true,
      fileData
    })
  }
  openCoreeModal = () => {

  }
  closeCoreeModal = (isShow) => {
    this.setState({
      isCoreModal: isShow
    })
  }
  render() {
    return (
      <div className="my-container">
        {this.state.isImageModal && < SelectImageModal
          modal1={this.state.isImageModal}
          open={this.openImageModal}
          close={this.closeImageModal}
        />}
        {this.state.isCoreModal && < CoreImageModal
          modal2={this.state.isCoreModal}
          fileData={this.state.fileData}
          close={this.closeCoreeModal}
        />}
        <div className="my-title">
          <img src={'http://47.96.21.88:8086/' + 'public/my-bg.png'} alt="me" />
          <div className="info">
            <div className="myicon">
              <img
                onClick={this.showImageModal}
                src={this.state.avatarPath}
                alt="icon"
              />
            </div>
            <div className="name">{this.state.uname}</div>
            <Button>已认证</Button>
            <div className="edit">编辑个人资料</div>
          </div>
        </div>
        <Grid
          className='grid'
          square
          columnNum={3}
          data={this.state.data}
          isCarousel
        />

        <div className="my-ad">
          <img src={'http://47.96.21.88:8086/' + 'public/ad.png'} alt="" />
        </div>
      </div>
    )
  }
}

export default Mine
