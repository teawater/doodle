var common = require('../../common.js')

var ctx

var ctx_xy = {
  x: 0,
  y: 0,
  l: 0,
  str: "",
}

Page({
  data: ctx_xy,
  canvasIdErrorCallback: function (e) {
    console.error(e.detail.errMsg)
  },
  onReady: function (e) {
    ctx = wx.createCanvasContext('firstCanvas')

    ctx.setFillStyle("#ffffff")
    ctx.fillRect(0, 0, 749, 749)
    ctx.setFillStyle("#000000")
    ctx.fillRect(10, 10, 1, 1)
    ctx.draw()
  },
  ctx_touch: function (e) {
    //console.log(e)
    var new_str = e.type+parseInt(common.px2rpx(e.changedTouches[0].x)).toString()+" "+parseInt(common.px2rpx(e.changedTouches[0].y)).toString()+ "\n" + this.data.str
    this.setData({
      // x: common.px2rpx(e.changedTouches[0].x),
      // y: common.px2rpx(e.changedTouches[0].y),
      // l: e.changedTouches.length
      str: new_str
    })
  }
})
