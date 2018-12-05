import React, { Component } from 'react'
import style from './Index.module.scss'
import CSSModules from 'react-css-modules'
import { Link } from 'react-router-dom'
import eventProxy from '@src/utils/eventProxy'
import { Divider } from 'antd'
import moment from 'moment'

class RecentReply extends Component {
  /**
   * 设置props的默认值
   */
  static defaultProps = {
    simple: true // 是否展示简单模式？
  }
  constructor() {
    super()
    this.state = {
      user: {}
    }
  }
  /**
   * 监听'user'，将被传入的数据设置到当前组件state中
   * P.S. 一般在此钩子下面调用接口或者类似操作
   */
  componentDidMount() {
    // 增加属性，表示当前实例未被卸载
    this.isUnmounted = false
    eventProxy.on('user', data => {
      // 如果当前实例被卸载了，就没有必要更新其state了（会引起内存泄漏）
      if (!this.isUnmounted) {
        this.setState({
          user: data
        })
      }
    })
  }
  /**
   * 给this增加属性，表示当前实例已被卸载
   */
  componentWillUnmount() {
    this.isUnmounted = true
  }

  render() {
    // 增加空值判断
    if (!this.state.user.recent_replies) {
      return <div />
    }

    const items = this.state.user.recent_replies.map(item => {
      let temp = (
        <Link key={item.id} to={'/topic/' + item.id}>
          {item.title}
        </Link>
      )
      // 如果不展示简单模式的话，就需要将用户头像等信息展示出来
      if (!this.props.simple) {
        temp = (
          <div>
            <Link styleName="avatar" to={'/user/' + item.author.loginname}>
              <img src={item.author && item.author.avatar_url} alt="头像" />
            </Link>
            <Link key={item.id} to={'/topic/' + item.id}>
              {item.title}
            </Link>
            <span styleName="time">
              {moment(item.last_reply_at, 'YYYY-MM-DD')
                .startOf('day')
                .fromNow()}
            </span>
            <Divider styleName="inside-divider" />
          </div>
        )
      }
      return <div key={item.id}>{temp}</div>
    })
    return (
      <div styleName="panel">
        <header>最近参与的话题</header>
        <Divider styleName="divider" />
        {items}
      </div>
    )
  }
}

export default CSSModules(RecentReply, style)
