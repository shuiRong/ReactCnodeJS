import React, { Component } from 'react'
import style from './Index.module.scss'
import CSSModules from 'react-css-modules'
import { Link } from 'react-router-dom'
import eventProxy from '@src/utils/eventProxy'
import { Divider } from 'antd'

class OtherTopic extends Component {
  static defaultProps = {
    simple: true // 是否展示简单模式？
  }
  constructor() {
    super()
    this.state = {
      user: {}
    }
  }

  componentWillMount() {
    eventProxy.on('user', data => {
      this.setState({
        user: data
      })
    })
  }

  render() {
    if (!this.state.user.recent_topics) {
      return <div />
    }

    const items = this.state.user.recent_topics.map(item => {
      return (
        <Link key={item.id} to={'/topic/' + item.id}>
          {item.title}
        </Link>
      )
    })
    return (
      <div styleName="panel">
        <header>作者最近话题</header>
        <Divider styleName="divider" />
        {items}
      </div>
    )
  }
}

export default CSSModules(OtherTopic, style)
