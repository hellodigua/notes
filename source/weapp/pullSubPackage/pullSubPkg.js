// subpackagePull/pullSbPkg.js
Page({

  blockApiList: [
    "navigateTo",
    "navigateBack",
    "reLaunch",
    "redirectTo",
    "switchTab",
    "showToast",
    "showLoading",
    "showActionSheet",
    "hideToast",
    "hideLoading",
    "showModal",
    "navigateToMiniProgram",
    "navigateBackMiniProgram"
  ],

  nopFunc:function () {

  },

  /**
   * 页面的初始数据
   */
  data: {
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    String.prototype.endsWith = String.prototype.endsWith || function (str) {
      if (str == null || str == "" || this.length == 0 || str.length > this.length) {
        return false;
      }
      if (this.substring(this.length - str.length)) {
        return true;
      } else {
        return false;
      }
      return true;
    };

    var currentPages = getCurrentPages();
    this.currentRoute = currentPages[currentPages.length - 1].route;
    (this.currentRoute[0] != '/') && (this.currentRoute = '/' + this.currentRoute)

    var that = this;
    this.blockApiList.forEach(function (api) {
      if (!wx["pullSubPkg_" + api]) {
        Object.defineProperty(wx, "pullSubPkg_" + api, { value: wx[api], configurable: true });
        Object.defineProperty(wx, api, { value: that.nopFunc });
      }
    });

    this.navigateTo = wx.pullSubPkg_navigateTo || wx.navigateTo;
    this.reLaunch = wx.pullSubPkg_reLaunch || wx.reLaunch;
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function (res) {
    if (wx.pagesToNavi) {
      this.doPullSubPkg();
    }
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function (res) {
    var that = this;
    setTimeout(function () {
      that.reLaunch({
        url: that.currentRoute
      })
    }, 200);
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },

  pullSubPackages: function() {
    if (wx.pullingSubPkg)
      return;
    wx.pullingSubPkg = true;
    var that = this;
    var config = __wxConfig;
    if (config) {
      var subPackageConfig = config.subPackages;
      if (subPackageConfig) {
        var timeout = 300;
        var pagesToNavi = [];
        subPackageConfig.forEach(function(sp) {
          var root = sp.root;
          if (root) {
            root.endsWith('/') || (root = root + "/");
            var pages = sp.pages;
            if (pages.length > 0) {
              var naviPage = root + pages[0];
              (__wxConfig.pages.indexOf(naviPage) == -1) &&
                (pages[0].indexOf(root) == 0) &&
                (naviPage = pages[0]);
              naviPage = '/' + naviPage;
              (naviPage !== that.currentRoute) && (pagesToNavi.push(naviPage));
            }
          }
        });
        wx.pagesToNavi = pagesToNavi;
        this.doPullSubPkg();
      }
    }
  },

  doPullSubPkg: function() {
    var that = this;
    if (wx.pagesToNavi && wx.pagesToNavi.length > 0) {
      that.setData({
        tip: "正在自动拉取子包， 剩余子包数：" + wx.pagesToNavi.length
      });
      var naviPage = wx.pagesToNavi.pop();
      setTimeout(function() {
        that.navigateTo({
          url: naviPage
        });
      }, 300)
    } else {
      that.onPullSubPkgFinished();
    }
  },

  onPullSubPkgFinished: function() {
    this.setData({
      tip: "自动拉取子包完成，请在系统最近任务列表中杀掉（划掉）该小程序任务。"
    });

    delete wx.pagesToNavi;
    this.blockApiList.forEach(function (api) {
      if (wx["pullSubPkg_" + api]) {
        Object.defineProperty(wx, api, { value: wx["pullSubPkg_" + api] });
        delete wx["pullSubPkg_" + api];
      }
    });
    wx.showToast({
      title: "hahaha"
    })
    console.log(getCurrentPages());
  }
})