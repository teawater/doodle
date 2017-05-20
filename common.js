// common.js
var px_rpx_ration
var point_size
var prev_x = 0
var prev_y = 0

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

function rpx_fillRect(ctx, x, y) {
  x = rpx2px(x)
  y = rpx2px(y)
  ctx.fillRect(x, y, 1, 1)
}

function px_fillRect(ctx, x, y, line) {
  x = px2draw(x)
  y = px2draw(y)
  ctx.fillRect(x, y, point_size, point_size)

/*   if (line) {
    console.log("line")
  }

  prev_x = x
  prev_y = y */
}

module.exports.setup_px_rpx_ratio = setup_px_rpx_ratio
module.exports.px2rpx = px2rpx
module.exports.rpx2px = rpx2px
module.exports.px_fillRect = rpx_fillRect
module.exports.px_fillRect = px_fillRect
