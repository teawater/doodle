// common.js
var px_rpx_ration

function setup_px_rpx_ratio() {
  var info = wx.getSystemInfoSync()
  px_rpx_ration = info.windowWidth / 750
}

function px2rpx(px) {
  return px / px_rpx_ration
}

module.exports.setup_px_rpx_ratio = setup_px_rpx_ratio
module.exports.px2rpx = px2rpx
