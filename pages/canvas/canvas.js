var common = require('../../common.js')

var ctx

Page({
  onReady: function (e) {
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
