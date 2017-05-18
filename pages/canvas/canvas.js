var common = require('../../common.js')

var this_page

Page({
  id: 0,
  ctx: undefined,
  ready: false,

  data: {
    status: '努力连接服务器中，请稍等...',
    show_ctx: false
  },

  handle_message: function(res) {
    var message = JSON.parse(res.data)
    if (message.id == undefined) {
      return false
    }
    if (message.op == 0) {
      
      this.color = message.color
    }
  }

  wss_connect: function() {
    wx.connectSocket({
      url: 'wss://127.0.0.1/',
      header:{ 
        'content-type': 'application/json'
      }
    })
  },
  socketopen: function(res) {
    this.setData({
      status: '服务器连接成功，下载数据，请稍等...',
    })
    wx.sendSocketMessage({
      data: JSON.stringify({id: this.id})
    })
  },
  socketmessage: function(res) {
    var message = JSON.parse(res.data)
    if (message.id == undefined || (message.op != 0 && message.op != 1) {
      this.setData({
        status: "收到一个错误包:" + res.data,
      })
      wx.closeSocket()
      return
    }
    this.setData({
      status: "",
      show_ctx: true
    })
    if (message.op == 0) {
      color = message.color
    }
  },
  socketerror: function(res) {
    this.setData({
      status: '服务器连接出错，重新连接，请稍等...',
    })
    wx.closeSocket()
  },
  socketclose: function(res) {
    this.setData({
      status: '重新连接，请稍等... ',
    })
    setTimeout(function() {this_page.wss_connect()}, 5000)
  },

  onLoad: function(options) {
    this_page = this

    this.color = new Array(750)
    for (var x = 0; x < 750; x++) {
      this.color[x] = new Array(750)
      for (var y = 0; y < 750; y++) {
        this.color[x][y] = "#ffffff"
      }
    }

    wx.onSocketOpen(this.socketopen)
    wx.onSocketMessage(this.socketmessage)
    wx.onSocketError(this.socketerror)
    wx.onSocketClose(this.socketclose)
    this.wss_connect()
  },

  onReady: function () {
    this.ctx = wx.createCanvasContext('firstCanvas')
    this.ready = true

/*     this.ctx.setFillStyle("#ffffff")
    this.ctx.fillRect(0, 0, common.rpx2px(750), common.rpx2px(750))
    this.ctx.draw(true) */
  },
  ctx_touch: function (e) {
    ctx.setFillStyle("#000000")
    common.fillRect(ctx, e.changedTouches[0].x, e.changedTouches[0].y)
    ctx.draw(true)
  }
})
