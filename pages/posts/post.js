var postsData = require("../../data/posts-data.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log("onLoad");

   
    this.setData({ post_key: postsData.postList})
  },
  onPostDetailTap: function (event) {
    var postId=event.currentTarget.dataset.postid
    console.log(postId)
    wx.navigateTo({
      url: 'post-detail/post-detail?id=' + postId
    })
  }
})