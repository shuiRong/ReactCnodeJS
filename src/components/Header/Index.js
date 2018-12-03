import React, { Component } from 'react'
import './Index.scss'

class Header extends Component {
  render() {
    return (
      <div className="header">
        <div>
          <a href="/">
            <img
              src={require('@src/assets/image/cnodejs.svg')}
              alt="网站logo"
            />
          </a>
        </div>
      </div>
    )
  }
}

export default Header
