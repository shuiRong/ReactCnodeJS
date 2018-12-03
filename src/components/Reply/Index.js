import React, { Component } from 'react'
import style from './Index.module.scss'
import CSSModules from 'react-css-modules'
import moment from 'moment'
import { Link } from 'react-router-dom'

class ProfilePanel extends Component {
  getHTML(html) {
    return {
      __html: html
    }
  }
  getThumbs(length) {
    if (!length) {
      return <span />
    }
    return (
      <span styleName="thumbs">
        <img src={require('@src/assets/image/thumbs-up.svg')} alt='点赞' />
        {length}
      </span>
    )
  }
  render() {
    if (!this.props.data) {
      return <div />
    }
    const data = this.props.data.map((reply, index) => {
      return (
        <div key={reply.id}>
          <Link to={'/profile/' + reply.author.loginname}>
            <img src={reply.author && reply.author.avatar_url} alt='头像'/>
          </Link>
          <div>
            <div styleName="info">
              <p>
                <span>{index + 1}楼&nbsp;</span>
                <Link to={'/profile/' + reply.author.loginname}>
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
    data.unshift(
      <div key={1}>
        <span>{this.props.data.length}</span>&nbsp;回复
      </div>
    )

    return <div styleName="reply">{data}</div>
  }
}

export default CSSModules(ProfilePanel, style)
