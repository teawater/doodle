var common = require('../../common.js')

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
    var ctx = wx.createCanvasContext('firstCanvas')

    ctx.setFillStyle('red')
    ctx.fillRect(0, 0, 1000, 1000)
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
