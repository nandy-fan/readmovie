// pages/movies/movies.js
var app =getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    inTheaters: {},
    comingSoon: {},
    top250: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var inTheatersUrl = app.globalData.doubanBase +
      "/v2/movie/in_theaters" + "?start=0&count=3";
    var comingSoonUrl = app.globalData.doubanBase +
      "/v2/movie/coming_soon" + "?start=0&count=3";
    var top250Url = app.globalData.doubanBase +
      "/v2/movie/top250" + "?start=0&count=3";
    this.getMovieListData(inTheatersUrl, "inTheaters");
    this.getMovieListData(comingSoonUrl, "comingSoon");
    this.getMovieListData(top250Url,"top250");
  },


 

  getMovieListData: function (url, subkey) {
     var that =this
      wx.request({
        url: url,
        method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
        header: {
          "Content-Type": "json"
        },
        success: function (res) {
          //console.log(res)
          that.processDoubanData(res.data, subkey)
        },
        fail: function (error) {
          // fail
          console.log(error)
        }
      })
    },

  processDoubanData: function (movieDouban,subkey){
    var movies =[];
    for(var idx in movieDouban.subjects){
      var subject = movieDouban.subjects[idx];
      var title = subject.title;
      if(title.length >6){
        title = title.substring(0,6) + "...";
      } 
      var temp = {
        title: title,
        average :subject.rating.average,
        coveragerUrl:subject.images.large,
        movieId:subject.id
      }
      movies.push(temp);
    }

    var radyData = {};
    radyData[subkey] = {movies: movies};

    this.setData(radyData)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
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
  
  }
})