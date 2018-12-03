import React, { Component } from 'react'
import style from './Index.module.scss'
import CSSModules from 'react-css-modules'
import { getUserByName } from '@src/utils/api'
import { Link } from 'react-router-dom'
import eventProxy from '@src/utils/eventProxy'
import moment from 'moment'

class ProfilePanel extends Component {
  constructor() {
    super()
    this.state = {
      user: {}
    }
  }

  componentWillMount() {
    this.fetchData(this.props.loginname)
  }
  componentWillReceiveProps(nextProps) {
    this.fetchData(nextProps.loginname)
  }
  fetchData(loginname) {
    getUserByName(loginname).then(res => {
      this.setState({
        user: res.data
      })
      eventProxy.trigger('user', res.data)
    })
  }

  render() {
    return (
      <div styleName="panel">
        <Link styleName="user" to={'/profile/' + this.state.user.loginname}>
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
