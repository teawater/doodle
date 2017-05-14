var common = require('../../common.js')

const wss_url = 'wss://127.0.0.1/'
var ctx

function socketopen(res) {
  console.log('WebSocket连接已打开！')
  this.setData({
    status: '服务器连接成功，下载数据，请稍等...',
  })
  wx.sendSocketMessage({
    data:"0"
  })
}

Page({
  data: {
    status: '努力连接服务器中，请稍等...',
    show_status: true
  },
  onLoad: function(options) {
    wx.connectSocket({
      url: wss_url,
    })
    wx.onSocketOpen(socketopen)
/*     wx.onSocketOpen(function(res){
  
  wx.sendSocketMessage({
      data:"Canvas"
    })
}) */
    wx.onSocketError(function(res){
      console.log('WebSocket连接打开失败，请检查！')
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
