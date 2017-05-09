// common.js
var px_rpx_ration
var point_size

function setup_px_rpx_ratio() {
  var info = wx.getSystemInfoSync()

  px_rpx_ration = info.windowWidth / 750
  point_size = Math.ceil(px_rpx_ration)
}

function px2rpx(px) {
  return Math.round(px / px_rpx_ration)
}

function rpx2px(rpx) {
  return Math.round(rpx * px_rpx_ration)
}

function px2draw(px) {
  return Math.floor(px / point_size) * point_size
}

function fillRect(ctx, x, y) {
  x = px2draw(x)
  y = px2draw(y)
  ctx.fillRect(x, y, point_size, point_size)
}

module.exports.setup_px_rpx_ratio = setup_px_rpx_ratio
module.exports.px2rpx = px2rpx
module.exports.rpx2px = rpx2px
module.exports.fillRect = fillRect
