import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom'
import Header from './components/Header/Index'
import Home from './views/Home/Index'
import Profile from './views/Profile/Index'
import Topic from './views/Topic/Index'
import './App.scss'

/**
 * 路由设置
 */
class App extends Component {
  render() {
    return (
      <div>
        <Header />
        <Router>
          <div className="box">
            <Route exact path="/" component={Home} />
            <Route path="/topic/:id" component={Topic} />
            <Route path="/user/:id" component={Profile} />
            <Route exact path="/topic" render={() => <Redirect to="/" />} />
            <Route exact path="/user" render={() => <Redirect to="/" />} />
          </div>
        </Router>
      </div>
    )
  }
}

export default App
