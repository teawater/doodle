var common = require('../../common.js')

const wss_url = 'wss://127.0.0.1/'
var ctx

/* function socketopen(res) {
  console.log('WebSocket连接已打开！')
  this.setData({
    status: '服务器连接成功，下载数据，请稍等...',
  })
  wx.sendSocketMessage({
    data:"0"
  })
} */

Page({
  data: {
    status: '努力连接服务器中，请稍等...',
  },

  onLoad: function(options) {
    wx.connectSocket({
      url: wss_url,
    })
    wx.onSocketOpen(this.socketopen)
    wx.onSocketError(this.socketerror)
    wx.onSocketClose(this.socketclose)
  },

  socketopen: function(res) {
    this.setData({
      status: '服务器连接成功，下载数据，请稍等...',
    })
    wx.sendSocketMessage({
      data:"0"
    })
  },

  socketerror: function(res) {
    this.setData({
      status: '服务器连接出错，重新连接，请稍等...',
    })
    wx.closeSocket()
  },

  socketclose: function(res) {
    this.setData({
      status: '重新连接，请稍等...',
    })
    wx.connectSocket({
      url: wss_url,
    })
  },

  onReady: function () {
    ctx = wx.createCanvasContext('firstCanvas')

    ctx.setFillStyle("#ffffff")
    ctx.fillRect(0, 0, common.rpx2px(750), common.rpx2px(750))
    ctx.draw(true)
  },
  ctx_touch: function (e) {
    ctx.setFillStyle("#000000")
    common.fillRect(ctx, e.changedTouches[0].x, e.changedTouches[0].y)
    ctx.draw(true)
  }
})
