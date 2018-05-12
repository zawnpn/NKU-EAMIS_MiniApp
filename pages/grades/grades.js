var config = require('../../config.js')
var srvUrl = config.srvUrl
Page({

  data: {
    gradeData: []
  },

  refreshGrade: function () {
    this.requestGrade()
  },

  requestGrade: function() {
    var username = wx.getStorageSync('username')
    var password = wx.getStorageSync('password')
    var page = this
    wx.showLoading({
      title: '刷新中...'
    })
    wx.request({
      url: srvUrl,
      data: {
        username: username,
        password: password,
        func: 'gradejson',
        category: 'ABCDE'
      },
      method: 'POST',
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      success: function (res) {
        wx.hideLoading()
        if ((typeof res.data) == "object") {
          var gradeData = []
          for (var i = 0; i < res.data.length; i++) {
            var item = {
              course: res.data[i][0],
              score: res.data[i][2],
              weight: res.data[i][1]
            }
            gradeData.push(item)
          }
          page.setData({
            gradeData: gradeData
          })
        }
        else {
          wx.showModal({
            title: '查询失败',
            content: '请确认学号和密码是否正确！',
            showCancel: false,
            success: function(res) {
              if (res.confirm) {
                wx.switchTab({
                  url: '/pages/login/login'
                })
              }
            }
          })
        }
      }
    })
  },

  onLoad: function () {
    this.requestGrade()
  },

  onShow: function () {
    var status = wx.getStorageSync('status')
    if (status !== true) {
      wx.showModal({
        title: '',
        content: '请先登录！',
        showCancel: false,
        success: function (res) {
          if (res.confirm) {
            wx.switchTab({ url: '/pages/login/login' })
          }
        }
      })
    }
  }
})