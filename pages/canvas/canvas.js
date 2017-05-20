var common = require('../../common.js')

var this_page

const ctx_x = 750
const ctx_y = 750
const retry_sec = 2

Page({
  id: 0,
  ctx: undefined,
  connected: false,

  data: {
    status: '努力连接服务器中，请稍等...',
    show_ctx: false
  },

  show_all_color: function() {
    if (this.ctx == undefined) {
      return
    }

    for (var x = 0; x < ctx_x; x++) {
      for (var y = 0; y < ctx_y; y++) {
        common.rpx_fillRect(this.ctx, x, y)
      }
    }
    this.ctx.draw(true)
  },

  handle_message: function(res) {
    var message = JSON.parse(res.data)

    if (typeof(message.id) === undefined) {
      return false
    }

    if (typeof(message.fmt) !== undefined) {
      if (message.fmt == 0) {
        /* fmt 0: color[x][y] */
        if (message.color.length != ctx_x) {
          return false
        }
        for (var x = 0; x < ctx_x; x++) {
          if (message.color[x].length != ctx_y) {
            return false
          }
        }
        this.color = message.color
        this.show_all_color()
      } else if (message.fmt == 1) {
        /* fmt 1: color.x color.y color.val */
        for (color in message.color) {
          if ((color.x < 0 || color.x > ctx_x) ||
            (color.y < 0 || color.y > ctx_y)) {
            return false
          }
          this.color[color.x][color.y] = color.val
          if (typeof(this.ctx) !== undefined) {
            common.rpx_fillRect(this.ctx, x, y)
            this.ctx.draw(true)
          }
        }
      } else {
        return false
      }
    }

    this.id = message.id

    return true
  },

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
    if (this.handle_message(res) == false) {
      this.setData({
        status: "收到一个错误包:" + res.data,
        show_ctx: false
      })
      wx.closeSocket()
      return
    }

    this.setData({
      status: "",
      show_ctx: true
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
      status: '重新连接，请稍等... ',
    })
    setTimeout(function() {this_page.wss_connect()}, retry_sec * 1000)
  },

  onLoad: function(options) {
    this_page = this

    this.color = new Array(ctx_x)
    for (var x = 0; x < ctx_x; x++) {
      this.color[x] = new Array(ctx_y)
      for (var y = 0; y < ctx_y; y++) {
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

    if (this.data.show_ctx) {
      this.show_all_color()
    }
  },

  ctx_touch: function (e) {
    ctx.setFillStyle("#000000")
    common.px_fillRect(ctx, e.changedTouches[0].x, e.changedTouches[0].y)
    ctx.draw(true)
  }
})
