
Page({

  data: {
    years: wx.getStorageSync('years'),
    terms: ['第一学期','第二学期','夏季学期']
  },
  bindYearChange: function (e) {
    this.setData({
      yindex: e.detail.value
    })
    wx.setStorageSync('yindex', e.detail.value)
  },
  bindTermChange: function (e) {
    this.setData({
      tindex: e.detail.value
    })
    wx.setStorageSync('tindex', e.detail.value)
  },
  bindConfirm: function () {
    wx.switchTab({
      url: '/pages/courses/courses',
      success: function (e) {
        var page = getCurrentPages().pop();
        if (page == undefined || page == null) return;
        page.onLoad();
      }
    })
  },

  onLoad: function () {
    wx.setStorageSync('semesterChanged', true)
  }
})