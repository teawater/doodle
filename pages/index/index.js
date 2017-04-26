var ctx_xy = {
  x: 0,
  y: 0,
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
  ctx_touchstart: function (e) {
    this.setData({
      x: e.changedTouches[0].x,
      y: e.changedTouches[0].y,
    })
  }
})
