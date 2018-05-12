var config = require('../../config.js')
var srvUrl = config.srvUrl
var app = getApp()
var inputs = {}

Page({
  data: {
    loginStatus: wx.getStorageSync('status'),
    inputs: {},
    infoHeight: 320
  },

  inputChange: function (e) {
    inputs[e.currentTarget.id] = e.detail.value
  },

  formSubmit: function () {
    var page = this
    if (inputs['username'] == null || inputs['username'] == '') {
      wx.showToast({
        title: '请输入学号！',
        icon: 'none'
      })
      return
    }
    if (inputs['password'] == null || inputs['password'] == '') {
      wx.showToast({
        title: '请输入密码！',
        icon: 'none'
      })
      return
    }
    wx.showLoading({
      title: '登录中...'
    })
    wx.request({
      url: srvUrl,
      data: {
        username: inputs['username'],
        password: inputs['password'],
        func: 'detail'
      },
      method: 'POST',
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      success: function (res) {
        wx.hideLoading()
        if (res.data) {
          wx.setStorageSync('username', inputs['username'])
          wx.setStorageSync('password', inputs['password'])
          wx.setStorageSync('name', res.data.name)
          wx.setStorageSync('school', res.data.school)
          wx.setStorageSync('major', res.data.major)
          wx.setStorageSync('infoHeight', 480)
          wx.setStorageSync('status', true)
          page.setData({
            loginStatus: true,
            name: res.data.name,
            school: res.data.school,
            major: res.data.major,
            infoHeight: 480
          })
          wx.showToast({
            title: '登录成功',
          })
        }
        else {
          wx.setStorageSync('status', false)
          wx.showModal({
            title: '登录失败',
            content: '请确认学号和密码是否正确！',
            showCancel: false
          })
        }

      }
    })

  },

  formReset: function () {
    inputs = {}
    if (wx.getStorageSync('status') == true){
      wx.showToast({
        title: '注销成功'
      })
    }
    wx.clearStorageSync()
    this.setData({
      inputs: inputs,
      loginStatus: false,
      infoHeight: 320
    })
    
  },

  onShow: function () {
    inputs['username'] = wx.getStorageSync('username')
    inputs['password'] = wx.getStorageSync('password')
    this.setData({
      inputs: inputs,
      loginStatus: wx.getStorageSync('status'),
      name: wx.getStorageSync('name'),
      school: wx.getStorageSync('school'),
      major: wx.getStorageSync('major'),
      infoHeight: wx.getStorageSync('infoHeight')
    })
  }
})