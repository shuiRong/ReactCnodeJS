import React, { Component } from 'react'
import { getTopics } from '@src/utils/api'
import Topics from '@src/components/Topics/Index'
import './Index.scss'
import { Tabs, Spin } from 'antd'

const TabPane = Tabs.TabPane

class Home extends Component {
  constructor() {
    super()
    this.state = {
      page: 1,
      limit: 20
    }
  }
  componentWillMount() {
    this.getTopics(1, 20)
  }
  getTopics(page, limit, tab) {
    getTopics({
      page,
      limit,
      tab
    }).then(res => {
      this.setState({
        list: res.data
      })
    })
  }
  tabChanged = tab => {
    this.getTopics(1, 20, tab)
  }
  render() {
    return (
      <div className="home">
        <Spin spinning={false}>
          <div className="bar">
            <Tabs defaultActiveKey="" onChange={this.tabChanged}>
              <TabPane tab="全部" key="">
                <Topics list={this.state.list} />
              </TabPane>
              <TabPane tab="精华" key="good">
                <Topics list={this.state.list} />
              </TabPane>
              <TabPane tab="分享" key="share">
                <Topics list={this.state.list} />
              </TabPane>
              <TabPane tab="问答" key="ask">
                <Topics list={this.state.list} />
              </TabPane>
              <TabPane tab="工作" key="job">
                <Topics list={this.state.list} />
              </TabPane>
            </Tabs>
          </div>
        </Spin>
      </div>
    )
  }
}

export default Home
