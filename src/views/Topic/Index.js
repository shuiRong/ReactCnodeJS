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
  /**
   * 调用接口获取数据
   * P.S. 一般在此钩子下面调用接口或者类似操作
   */
  componentDidMount() {
    this.fetchData(this.props.match.params.id)
  }
  /**
   * 在当前路由状态变化后触发的钩子函数
   * P.S. 这个函数一般用来解决，路由发生了变化，但组件因为没有被销毁所以不会再一次触发‘componentDidMount’钩子，
   * 这时候就可以在当前钩子下重新获取数据
   * @param {Object} nextProps props对象
   */
  componentWillReceiveProps(nextProps) {
    this.fetchData(nextProps.match.params.id)
  }
  /**
   * 封装好的获取数据的函数，这样就不需要每次使用都copy一遍代码了
   */
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
  /**
   * 将html内容包裹在对象中，key必须是'__html'
   * 详情见：https://react.docschina.org/docs/dom-elements.html#dangerouslysetinnerhtml%E5%87%BD%E6%95%B0
   * @param {String} html html字符串
   */
  getHTML(html) {
    return {
      __html: html
    }
  }
  render() {
    // 在没有数据时，展示骨架图
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
            <Link to={'/user/' + this.state.topic.loginname}>
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
