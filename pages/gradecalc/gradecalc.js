var config = require('../../config.js')
var srvUrl = config.srvUrl
Page({

  data: {
    items: [
      { value: 'A', name: 'A:校公共必修课' },
      { value: 'B', name: 'B:院系公共必修课' },
      { value: 'C', name: 'C:专业必修课' },
      { value: 'D', name: 'D:专业选修课' },
      { value: 'E', name: 'E:任选课' }
    ],
    avgScore: "",
    total: ""
  },
  checkboxChange: function (e) {
    var tmp = e.detail.value.sort()
    var cat = ""
    for (var i=0;i<tmp.length;i++) {
      cat += tmp[i]
    }
    wx.setStorageSync('cat',cat)
  },

  requestGradeCalc: function(cat) {
    var username = wx.getStorageSync('username')
    var password = wx.getStorageSync('password')
    var page = this
    wx.showLoading({
      title: '计算中...'
    })
    wx.request({
      url: srvUrl,
      data: {
        username: username,
        password: password,
        func: 'gradecalc',
        category: cat
      },
      method: 'POST',
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      success: function (res) {
        wx.hideLoading()
        if ((typeof res.data) == "object") {
          page.setData({
            avgScore: res.data[0],
            total: res.data[1]
          })
        }
        else {
          wx.showModal({
            title: '查询失败',
            content: '请确认学号和密码是否正确！',
            showCancel: false,
            success: function (res) {
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

  bindConfirm: function() {
    var cat = wx.getStorageSync('cat')
    console.log(cat)
    this.requestGradeCalc(cat)
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