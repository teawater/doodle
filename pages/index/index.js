var ctx_xy = {
  x: 0,
  y: 0,
  l: 0,
};
var res;
Page({
  data: ctx_xy,
  canvasIdErrorCallback: function (e) {
    console.error(e.detail.errMsg)
  },
  onReady: function (e) {
    try {
  res = wx.getSystemInfoSync()
  console.log(res.model)
  //console.log(res.pixelRatio)
  console.log(res.windowWidth)
  console.log(res.windowHeight)
  console.log(res.language)
  console.log(res.version)
  console.log(res.platform)
} catch (e) {
  // Do something when catch error
}
    var ctx = wx.createCanvasContext('firstCanvas')

    ctx.setFillStyle('red')
    ctx.fillRect(0, 0, 1000, 1000)
    ctx.draw()
  },
  ctx_touchstart: function (e) {
    this.setData({
      x: e.changedTouches[0].x/(res.windowWidth/750),
      y: e.changedTouches[0].y/(res.windowWidth/750),
      l: e.changedTouches.length
    })
  }
})
