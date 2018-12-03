import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Tag } from 'antd'
import moment from 'moment'
import style from './Index.module.scss'
import CSSModules from 'react-css-modules'
import tab from '@src/utils/tab'

class Topics extends Component {
  render() {
    if (!this.props.list) {
      return <div />
    }
    const items = this.props.list.map(item => {
      return (
        <div styleName="topic" key={item.id}>
          <Link to={'/profile/' + item.author.loginname}>
            <img src={item.author.avatar_url} alt="用户头像" />
          </Link>
          <span styleName="count">
            <em>{item.reply_count}</em>/<em>{item.visit_count}</em>
          </span>
          <Tag color={tab[item.tab] && tab[item.tab].color}>
            {tab[item.tab] && tab[item.tab].name}
          </Tag>
          <Link styleName="title" to={'/topic/' + item.id}>
            {item.title}
          </Link>
          <span styleName="time">
            {moment(item.last_reply_at, 'YYYY-MM-DD')
              .startOf('day')
              .fromNow()}
          </span>
        </div>
      )
    })

    return <div>{items}</div>
  }
}

export default CSSModules(Topics, style)
