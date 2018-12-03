import React, { Component } from 'react'
import { getTopicById } from '@src/utils/api'
import style from './Index.module.scss'
import CSSModules from 'react-css-modules'
import ProfilePanel from '@src/components/ProfilePanel/Index'
import OtherTopic from '@src/components/OtherTopic/Index'
import RecentReply from '@src/components/RecentReply/Index'
import Reply from '@src/components/Reply/Index'
import '@src/assets/vue.css'
import moment from 'moment'
import { Link } from 'react-router-dom'
import tab from '@src/utils/tab'
import { Divider, Skeleton } from 'antd'

class Topic extends Component {
  constructor() {
    super()
    this.state = {
      topic: {}
    }
  }
  componentWillMount() {
    this.fetchData(this.props.match.params.id)
  }
  componentWillReceiveProps(nextProps) {
    this.fetchData(nextProps.match.params.id)
  }
  fetchData(id) {
    getTopicById(id).then(res => {
      this.setState({
        topic: {
          ...res.data,
          ...res.data.author
        }
      })
    })
  }
  getHTML(html) {
    return {
      __html: html
    }
  }
  render() {
    if (!this.state.topic.id) {
      return <Skeleton active />
    }
    return (
      <div styleName="topic">
        <div styleName="left">
          <div
            styleName="title"
            dangerouslySetInnerHTML={this.getHTML(this.state.topic.title)}
          />
          <div styleName="info">
            <span>
              发布于&nbsp;
              {moment(this.state.topic.create_at, 'YYYY-MM-DD')
                .startOf('day')
                .fromNow()}
              &nbsp;•&nbsp;
            </span>
            作者：
            <Link to={'/profile/' + this.state.topic.loginname}>
              {this.state.topic.loginname}
            </Link>
            &nbsp;•&nbsp;
            <span>{this.state.topic.visit_count}次浏览&nbsp;•&nbsp;</span>
            <span>
              来自：
              {tab[this.state.topic.tab] && tab[this.state.topic.tab].name}
            </span>
          </div>
          <Divider />
          <div
            styleName="content"
            dangerouslySetInnerHTML={this.getHTML(this.state.topic.content)}
          />
          <Reply data={this.state.topic.replies} />
        </div>
        <div styleName="right">
          <ProfilePanel loginname={this.state.topic.loginname} />
          <OtherTopic />
          <RecentReply />
        </div>
      </div>
    )
  }
}

export default CSSModules(Topic, style)
