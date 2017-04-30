//app.js
var common = require('common.js')

App({
  onLaunch: function () {
    common.setup_px_rpx_ratio()
  },
})