import React, { Component } from 'react'
import { getTopics } from '@src/utils/api'
import Topics from '@src/components/Topics/Index'
import style from './Index.module.scss'
import CSSModules from 'react-css-modules'
import { Tabs, Spin } from 'antd'

const TabPane = Tabs.TabPane

/**
 * 网站首页
 */
class Home extends Component {
  constructor() {
    super()
    this.state = {
      page: 1,
      limit: 20,
      list: [],
      store: {}, // 存储所有Tab对应的数据，因为切换Tab后就没必要重新以limit:20加载数据。
      tab: 'all' // 当前Tab，声明在全局变量里是为了滚动时相关函数也可以获取的到
    }
  }
  /**
   * 1. 调用接口获取数据
   * 2. 绑定窗口滚动监听函数
   * P.S. 一般在此钩子下面调用接口或者类似操作
   */
  componentDidMount() {
    this.getTopics()
    window.addEventListener('scroll', this.scrollMethod)
  }
  /**
   * 组件被销毁时，记得移除绑定的滚动事件
   */
  componentWillUnmount() {
    window.removeEventListener('scroll', this.scrollMethod)
  }
  /**
   * 封装好的获取首页数据的函数，这样就不需要每次使用都copy一遍代码了
   */
  getTopics() {
    const state = this.state
    getTopics({
      page: state.page,
      limit: state.limit,
      tab: state.tab
    }).then(res => {
      const store = state.store

      this.setState({
        list: res.data,
        limit: this.state.limit + 10
      })
      // 将数据存储到对应的key下
      store[state.tab] = {
        limit: state.limit,
        data: res.data
      }
    })
  }
  /**
   * 滚动函数，判断当前滚动条是否到了底部来决定是否重新拉取数据
   */
  scrollMethod = () => {
    const sumH =
      document.body.scrollHeight || document.documentElement.scrollHeight
    const viewH = document.documentElement.clientHeight
    const scrollH =
      document.body.scrollTop || document.documentElement.scrollTop
    if (viewH + scrollH >= sumH) {
      this.getTopics()
    }
  }
  /**
   * 当前Tab变化时判断Store里是否已经存储数据。
   * 是：拉出来，设置到state中
   * 否：重新获取数据
   * 这里使用箭头函数而不是上面的那种方式，是为了解决this问题
   * 详情看：https://react.docschina.org/docs/react-without-es6.html#%E8%87%AA%E5%8A%A8%E7%BB%91%E5%AE%9A
   * （或者自行Google）
   */
  tabChanged = tab => {
    const store = this.state.store

    // 如果未存储当前Tab的数据，重新获取
    if (!store[tab]) {
      this.setState(
        {
          tab,
          limit: 20,
          list: []
        },
        () => {
          this.getTopics()
        }
      )
      return
    }

    this.setState({
      tab,
      limit: store[tab].limit,
      list: store[tab].data
    })
  }
  render() {
    return (
      <div styleName="home">
        <Spin spinning={false}>
          <div>
            <Tabs defaultActiveKey="" onChange={this.tabChanged}>
              <TabPane tab="全部" key="all">
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

export default CSSModules(Home, style)
