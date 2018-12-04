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
      tab: '' // 当前Tab，声明在全局变量里是为了滚动时相关函数也可以获取的到
    }
  }
  /**
   * 在render钩子执行前：
   * 1. 调用接口获取数据
   * 2. 绑定窗口滚动监听函数
   */
  componentWillMount() {
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
    getTopics({
      page: this.state.page,
      limit: this.state.limit,
      tab: this.state.tab
    }).then(res => {
      this.setState({
        list: res.data,
        limit: this.state.limit + 10
      })
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
   * 当前Tab变化时的回调函数
   * 每次切换Tab时，重置limit参数
   * 这里使用箭头函数而不是上面的那种方式，是为了解决this问题
   * 详情看：https://react.docschina.org/docs/react-without-es6.html#%E8%87%AA%E5%8A%A8%E7%BB%91%E5%AE%9A
   * （或者自行Google）
   */
  tabChanged = tab => {
    // 传递第二个参数：回调函数，表示在状态已经被设置成功后，调用获取数据接口
    this.setState(
      {
        tab,
        limit: 20
      },
      () => {
        this.getTopics()
      }
    )
  }
  render() {
    return (
      <div styleName="home">
        <Spin spinning={false}>
          <div>
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

export default CSSModules(Home, style)
