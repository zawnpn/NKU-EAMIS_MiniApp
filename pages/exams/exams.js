var config = require('../../config.js')
var srvUrl = config.srvUrl
Page({

  data: {
    examData: []
  },

  refreshExams: function () {
    this.requestExams()
  },

  requestExams: function () {
    var username = wx.getStorageSync('username')
    var password = wx.getStorageSync('password')
    var page = this
    var date = new Date()
    var Y = date.getFullYear()
    var M = date.getMonth() + 1
    if (M > 1 && M <= 7) var semester = (Y - 1) + '-' + Y + ':2'
    else if (M > 7 && M <= 12) var semester = Y + '-' + (Y + 1) + ':1'
    else var semester = (Y - 1) + '-' + Y + ':1'
    wx.showLoading({
      title: '刷新中...'
    })
    wx.request({
      url: srvUrl,
      data: {
        username: username,
        password: password,
        func: 'examjson',
        semester: semester
      },
      method: 'POST',
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      success: function (res) {
        wx.hideLoading()
        if ((typeof res.data) == "object") {
          var examData = []
          for (var i = 0; i < res.data.length; i++) {
            var item = {
              course: res.data[i][0],
              date: res.data[i][1],
              time: res.data[i][2],
              room: res.data[i][3]
            }
            examData.push(item)
          }
          page.setData({
            examData: examData
          })
        }
        else {
          wx.showModal({
            title: '查询失败',
            content: '请确认学号和密码是否正确！',
            showCancel: false,
            success: function(res) {
              wx.switchTab({
                url: '/pages/login/login'
              })
            }
          })
        }
      }
    })
  },

  onLoad: function (options) {
    this.requestExams()
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