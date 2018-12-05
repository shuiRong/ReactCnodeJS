import React, { Component } from 'react'
import style from './Index.module.scss'
import CSSModules from 'react-css-modules'
import { getUserByName } from '@src/utils/api'
import { Link } from 'react-router-dom'
import eventProxy from '@src/utils/eventProxy'
import moment from 'moment'
import { Skeleton } from 'antd'

/**
 * 帖子页面右侧最上方的个人信息展示组件
 */
class ProfilePanel extends Component {
  /**
   * state有两种初始化方法，这是其中一种
   * 另外一种见：header/index.js文件
   */
  constructor() {
    super()
    this.state = {
      user: {}
    }
  }
  /**
   * 调用接口获取数据
   * P.S. 一般在此钩子下面调用接口或者类似操作
   */
  componentDidMount() {
    this.fetchData(this.props.loginname)
  }
  /**
   * 在当前路由状态变化后触发的钩子函数
   * P.S. 这个函数一般用来解决，路由发生了变化，但组件因为没有被销毁所以不会再一次触发‘componentDidMount’钩子，
   * 这时候就可以在当前钩子下重新获取数据
   * @param {Object} nextProps props对象
   */
  componentWillReceiveProps(nextProps) {
    this.fetchData(nextProps.loginname)
  }
  /**
   * 封装好的获取数据的函数，这样就不需要每次使用都copy一遍代码了
   */
  fetchData(loginname) {
    getUserByName(loginname).then(res => {
      this.setState({
        user: res.data
      })
      eventProxy.trigger('user', res.data)
    })
  }

  render() {
    // 在没有数据时，展示骨架图
    if (!this.state.user.loginname) {
      return <Skeleton active />
    }
    return (
      <div styleName="panel">
        <Link styleName="user" to={'/user/' + this.state.user.loginname}>
          <img src={this.state.user.avatar_url} alt="用户头像" />
          <span>{this.state.user.loginname}</span>
        </Link>
        <div>积分：{this.state.user.score}</div>
        <div>
          Github：
          <a href={this.state.user.githubUsername} target="_blanket">
            {this.state.user.githubUsername}
          </a>
        </div>
        <div>
          注册时间：
          {moment(this.state.user.create_at, 'YYYY-MM-DD')
            .startOf('day')
            .fromNow()}
        </div>
      </div>
    )
  }
}

export default CSSModules(ProfilePanel, style)
