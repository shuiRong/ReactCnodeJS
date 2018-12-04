import React, { Component } from 'react'
import style from './Index.module.scss'
import CSSModules from 'react-css-modules'
import moment from 'moment'
import { Link } from 'react-router-dom'

/**
 * 帖子回复组件
 */
class ProfilePanel extends Component {
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
  /**
   * 根据点赞人数是否为零来返回不同的html文件。毕竟不需要把 0赞 展示出来
   * @param {Number} length 点赞人数
   */
  getThumbs(length) {
    if (!length) {
      return <span />
    }
    return (
      <span styleName="thumbs">
        <img src={require('@src/assets/image/thumbs-up.svg')} alt="点赞" />
        {length}
      </span>
    )
  }
  render() {
    const data = this.props.data.map((reply, index) => {
      return (
        <div key={reply.id}>
          <Link to={'/user/' + reply.author.loginname}>
            <img src={reply.author && reply.author.avatar_url} alt="头像" />
          </Link>
          <div>
            <div styleName="info">
              <p>
                <span>{index + 1}楼&nbsp;</span>
                <Link to={'/user/' + reply.author.loginname}>
                  {reply.author.loginname}
                </Link>
                <span>
                  &nbsp;
                  {moment(reply.create_at, 'YYYY-MM-DD')
                    .startOf('day')
                    .fromNow()}
                </span>
              </p>
              {this.getThumbs(reply.ups.length)}
            </div>
            <p dangerouslySetInnerHTML={this.getHTML(reply.content)} />
          </div>
        </div>
      )
    })
    // 在最前面插入一行React元素，来展示一共有多少条回复信息
    data.unshift(
      <div key={1}>
        <span>{this.props.data.length}</span>&nbsp;回复
      </div>
    )

    return <div styleName="reply">{data}</div>
  }
}

export default CSSModules(ProfilePanel, style)
