/*
* @Author: Administrator
* @Date:   2017-08-05 10:59:46
* @Last Modified by:   Administrator
* @Last Modified time: 2017-08-05 15:26:10
*/

require('./index.css');
require('page/commons/nav/index.js');
require('page/commons/header/index.js');
var navSide       = require('page/commons/nav-side/index.js');
var _mall         = require('util/mall.js');
var _user         = require('service/user-service.js');
var templateIndex = require('./index.string');

// 表单里的错误信息
var page = {
    init : function(){
    	this.onLoad();
    },
    onLoad : function(){
    	navSide.init({
    		name : 'user-center'
    	});
    	this.loadUserInfo();
    },
    // 加载用户信息
    loadUserInfo : function(){
        var userHtml = '';
       _user.getUserInfo(function(res){
          userHtml = _mall.renderHtml(templateIndex, res);
          $('.panel-body').html(userHtml);
       }, function(errMsg){
          _mall.errorTips(errMsg);
       })
    }
};
$(function(){
	page.init();

})