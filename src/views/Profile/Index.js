import React, { Component } from 'react'
import style from './Index.module.scss'
import CSSModules from 'react-css-modules'
import ProfilePanel from '@src/components/ProfilePanel/Index'
import OtherTopic from '@src/components/OtherTopic/Index'
import RecentReply from '@src/components/RecentReply/Index'

class Profile extends Component {
  constructor() {
    super()
    this.state = {
      loginname: ''
    }
  }
  /**
   * 1. 调用接口获取数据
   * 2. 绑定窗口滚动监听函数
   * P.S. 一般在此钩子下面调用接口或者类似操作
   */
  componentDidMount() {
    this.setState({
      loginname: this.props.match.params.id
    })
  }
  /**
   * 在当前路由状态变化后触发的钩子函数
   * P.S. 这个函数一般用来解决，路由发生了变化，但组件因为没有被销毁所以不会再一次触发‘componentDidMount’钩子，
   * 这时候就可以在当前钩子下重新获取数据
   * @param {Object} nextProps props对象
   */
  componentWillReceiveProps(nextProps) {
    this.setState({
      loginname: nextProps.match.params.id
    })
  }
  render() {
    return (
      <div styleName="user">
        <ProfilePanel loginname={this.state.loginname} />
        <OtherTopic simple={false} />
        <RecentReply simple={false} />
      </div>
    )
  }
}

export default CSSModules(Profile, style)
