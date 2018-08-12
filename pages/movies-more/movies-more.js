// pages/movies-more/movies-more.js
var app = getApp()
var utils = require('../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    navigationBarTitle: "",
    movies: {},
    requestUrl: '',
    isEmpty:true,
    totalCount:0

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var category = options.category;
    this.data.navigationBarTitle = category
    var dataUrl = "";
    switch (category) {
      case "正在上映":
        dataUrl = app.globalData.doubanBase +
          "/v2/movie/in_theaters";
        break;
      case "即将上映":
        dataUrl = app.globalData.doubanBase +
          "/v2/movie/coming_soon";
        break;
      case "top250":
        dataUrl = app.globalData.doubanBase + "/v2/movie/top250";
        break;
    }
    this.data.requestUrl = dataUrl
    utils.http(dataUrl, this.processDoubanData);
  },
  onScrollLower: function(event) {
    var nextUrl = this.data.requestUrl +
      "?start=" + this.data.totalCount + "&count=20";
    console.log(nextUrl);
    utils.http(nextUrl, this.processDoubanData);
    wx.showNavigationBarLoading();
  },
  processDoubanData: function(movieDouban) {
    console.log(movieDouban)
    var movies = [];
    for (var idx in movieDouban.subjects) {
      var subject = movieDouban.subjects[idx];
      var title = subject.title;
      if (title.length > 6) {
        title = title.substring(0, 6) + "...";
      }
      var temp = {
        stars: utils.convertToStarsArray(subject.rating.stars),
        title: title,
        average: subject.rating.average,
        coveragerUrl: subject.images.large,
        movieId: subject.id
      }
      movies.push(temp);
    } 
    var totalMovies = {};
    if (this.data.isEmpty){
      totalMovies=movies
      this.data.isEmpty=true
    }else{
      totalMovies = this.data.movies.concat(movies);
    }
   
    this.setData({
      movies: totalMovies
    })
    wx.hideNavigationBarLoading();
    wx.stopPullDownRefresh()
    this.data.totalCount += 14;
    // var radyData = {};
    // radyData[subkey] = {
    //   cataTitle: cataTitle,
    //   movies: movies
    // };

    // this.setData(radyData)
  },
  onPullDownRefresh: function (event) {
    var refreshUrl = this.data.requestUrl +
      "?star=0&count=20";
    this.data.movies = {};
    this.data.isEmpty = false;
    this.data.totalCount = 0;
    util.http(refreshUrl, this.processDoubanData);
    wx.showNavigationBarLoading();
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    wx.setNavigationBarTitle({
      title: this.data.navigationBarTitle
    })

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})