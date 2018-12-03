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
  componentWillMount() {
    console.log(1, this.props.match.params.id)
    this.setState({
      loginname: this.props.match.params.id
    })
  }
  componentWillReceiveProps(nextProps) {
    console.log(2, nextProps.match.params.id)
    this.setState({
      loginname: nextProps.match.params.id
    })
  }
  render() {
    return (
      <div className="profile">
        <ProfilePanel loginname={this.state.loginname} />
        <OtherTopic />
        <RecentReply />
      </div>
    )
  }
}

export default CSSModules(Profile, style)
