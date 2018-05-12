var config = require('../../config.js')
var srvUrl = config.srvUrl
Page({
  data: {
    colorArrays: ["#85B8CF", "#90C652", "#D8AA5A", "#FC9F9D", "#0A9A84", "#61BC69", "#12AEF3", "#E29AAD", "#E045d8"],
    wlist: []
  },
  switchSemester: function() {
    wx.navigateTo({
      url: '/pages/semester/semester'
    })
  },

  makeSemesterIndex: function() {
    var date = new Date()
    var Y = date.getFullYear()
    var M = date.getMonth() + 1
    var years = []
    for (var i = 2016; i < Y; i++) {
      var item = i + '-' + (i + 1)
      years.push(item)
    }
    wx.setStorageSync('years',years)
    if (M > 1 && M < 7) {
      var yindex = years.indexOf((Y - 1) + '-' + Y)
      wx.setStorageSync('yindex', yindex)
      wx.setStorageSync('tindex', 1)
    }
    else if (M > 8 && M <= 12) {
      var yindex = years.indexOf(Y + '-' + (Y + 1))
      wx.setStorageSync('yindex', yindex)
      wx.setStorageSync('tindex', 0)
    }
    else if (M >= 7 && M <= 8) {
      var yindex = years.indexOf(Y + '-' + (Y + 1))
      wx.setStorageSync('yindex', yindex)
      wx.setStorageSync('tindex', 3)
    }
    else {
      var yindex = years.indexOf((Y - 1) + '-' + Y)
      wx.setStorageSync('yindex', yindex)
      wx.setStorageSync('tindex', 0)
    }
  },

  refreshCourse: function () {
    this.requestCourses()
  },

  requestCourses: function() {
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
    else {
      var page = this
      if (wx.getStorageSync('semesterChanged') !== true) {
        this.makeSemesterIndex()
      }
      var years = wx.getStorageSync('years')
      var yindex = wx.getStorageSync('yindex')
      var tindex = wx.getStorageSync('tindex')
      var semester = years[yindex] + ':' + (parseInt(tindex) + 1)
      var username = wx.getStorageSync('username')
      var password = wx.getStorageSync('password')

      wx.showLoading({
        title: '刷新课表中...'
      })
      wx.request({
        url: srvUrl,
        data: {
          username: username,
          password: password,
          func: 'coursejson',
          semester: semester
        },
        method: 'POST',
        header: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        success: function (res) {
          wx.hideLoading()
          if (res.data) {
            page.setData({
              wlist: res.data
            })
          }
          else {
            wx.showModal({
              title: '查询失败',
              content: '请确认学号和密码是否正确！',
              showCancel: false
            })
            wx.switchTab({
              url: '/pages/login/login'
            })
          }

        }
      })
    }
  },

  onLoad: function () {
    this.requestCourses()
  }
})