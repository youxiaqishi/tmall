/*
* @Author: Administrator
* @Date:   2017-07-30 11:45:58
* @Last Modified by:   Administrator
* @Last Modified time: 2017-08-02 22:54:34
*/

require('./index.css');

var _mall = require('util/mall.js');
var _user = require('service/user-service.js');

var Nav = {
	init : function(){
		this.bindEvent();
	},
	bindEvent : function(){
		// 登录点击事件
		$('.js-login').click(function(){
			_mall.doLogin();
		});
		// 注册点击事件
		$('.js-register').click(function(){
          window.location.href = './user-register.html';
		});
		// 退出点击事件
		$('.js-logout').click(function(){
			_user.logout(function(res){
             window.location.reload();
			},function(errMsg){
				_mall.errorTips(errMsg);
			})
		});
	}
} 
$(function(){
	Nav.init();
})